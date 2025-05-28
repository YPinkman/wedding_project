from sqlmodel import SQLModel, create_engine, Session
import os

# Use SQLite by default; allow override via env
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///database.db")

# For SQLite need check_same_thread False when used in multithreaded FastAPI
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
engine = create_engine(DATABASE_URL, echo=False, connect_args=connect_args)


def init_db() -> None:
    """Create tables on startup if they don't exist."""
    SQLModel.metadata.create_all(engine)


def get_session():
    """FastAPI dependency that yields a SQLModel Session."""
    with Session(engine) as session:
        yield session 