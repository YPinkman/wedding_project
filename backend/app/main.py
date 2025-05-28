from typing import List

from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select

from .database import init_db, get_session
from .models import RSVP, Blessing
from .core.qwen import get_stylist_advice_qwen, create_love_story_qwen

app = FastAPI(title="Wedding Invitation API", version="0.1.0")

# Allow all origins during development; tighten later.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup() -> None:
    """Initialize database tables when the service starts."""
    init_db()


# RSVP ----------------------------------------------------------------

@app.post("/api/rsvp", response_model=RSVP)
def create_rsvp(rsvp: RSVP, session: Session = Depends(get_session)):
    session.add(rsvp)
    session.commit()
    session.refresh(rsvp)
    return rsvp


# Blessings -----------------------------------------------------------

@app.post("/api/blessing", response_model=Blessing)
def create_blessing(blessing: Blessing, session: Session = Depends(get_session)):
    session.add(blessing)
    session.commit()
    session.refresh(blessing)
    return blessing


@app.get("/api/blessing", response_model=List[Blessing])
def read_blessings(offset: int = 0, limit: int = 20, session: Session = Depends(get_session)):
    blessings = session.exec(select(Blessing).order_by(Blessing.created_at.desc()).offset(offset).limit(limit)).all()
    return blessings


# AI Endpoints --------------------------------------------------------

@app.get("/api/ai/stylist")
async def get_stylist_advice(theme: str = Query(..., title="婚礼主题"), style: str = Query(..., title="着装风格")):
    advice = await get_stylist_advice_qwen(theme, style)
    if advice.startswith("错误："):
        raise HTTPException(status_code=500, detail=advice)
    return {"advice": advice}

@app.post("/api/ai/lovestory")
async def create_love_story(keywords: List[str]):
    story = await create_love_story_qwen(keywords)
    if story.startswith("错误："):
        raise HTTPException(status_code=500, detail=story)
    return {"story": story} 