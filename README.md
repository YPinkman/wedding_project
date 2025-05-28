# Wedding Invitation MVP

本仓库包含：

* `backend/` – 基于 FastAPI + SQLModel 的后端，SQLite 持久化。
* `frontend/` – 未来将迁移至 React + Vite，目前仍保留静态 HTML（在 `/home/yin/桌面/index.html`）。
* `docker-compose.yml` – 一键启动后端容器（前端稍后拆分）。

## 快速开始（本地直接运行）

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

访问：<http://localhost:8000/docs> 查看自动生成的接口文档。

## 使用 Docker

确保已安装 Docker Engine / Podman，并启用了 compose 插件。

```bash
# 项目根目录
cp .env.example .env  # 填入 QWEN_API_KEY 等
docker compose up --build
```

## 接口一览

| 方法 | 路径 | 描述 |
|------|------|------|
| POST | /api/rsvp | 保存出席回执 |
| POST | /api/blessing | 保存祝福留言 |
| GET  | /api/blessing?offset=0&limit=20 | 分页读取祝福 |

---

后续计划：
1. 将现有 HTML 拆分为 React 组件，整合到 `frontend/`。
2. RSVP/祝福表单改为调用上述 API。
3. AI 千问封装模块（`backend/app/core/qwen.py`）以及后台管理界面。 