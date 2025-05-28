from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime


class RSVP(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    attending: bool
    guests: int = 1
    dietary: Optional[str] = None
    message: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)


class Blessing(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(default="匿名")
    content: str
    created_at: datetime = Field(default_factory=datetime.utcnow) 