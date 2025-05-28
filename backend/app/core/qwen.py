import os
import httpx
from dotenv import load_dotenv

load_dotenv()

QWEN_API_KEY = os.getenv("QWEN_API_KEY")
QWEN_CHAT_API_URL = "https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation" # 请确认这是正确的千问API地址

async def get_qwen_response(prompt: str, model: str = "qwen-turbo") -> str:
    """Fetches a response from the Qwen API."""
    if not QWEN_API_KEY:
        return "错误：QWEN_API_KEY 未设置。"

    headers = {
        "Authorization": f"Bearer {QWEN_API_KEY}",
        "Content-Type": "application/json",
    }
    payload = {
        "model": model,
        "input": {
            "prompt": prompt
        },
        "parameters": {
            # 根据需要调整参数，例如 temperature, max_tokens 等
        }
    }

    async with httpx.AsyncClient(timeout=30.0) as client:
        try:
            response = await client.post(QWEN_CHAT_API_URL, json=payload, headers=headers)
            response.raise_for_status()  # Will raise an exception for 4XX/5XX status
            data = response.json()
            
            text_response = None
            # 尝试解析第一种常见的响应结构 (例如来自聊天类模型)
            try:
                text_response = data['output']['choices'][0]['message']['content']
            except (KeyError, IndexError, TypeError):
                pass # 如果解析失败，尝试下一种结构

            # 如果第一种结构未获取到文本，尝试第二种常见的响应结构 (例如某些文本生成模型的直接输出)
            if not text_response:
                try:
                    text_response = data['output']['text']
                except (KeyError, TypeError):
                    pass # 如果解析失败，text_response 保持 None
            
            if text_response:
                return text_response
            else:
                return f"错误：未能从API响应中获取文本。响应: {data}"
        except httpx.HTTPStatusError as e:
            return f"API 请求错误: {e.response.status_code} - {e.response.text}"
        except httpx.RequestError as e:
            return f"请求错误: {e}"
        except Exception as e:
            return f"发生未知错误: {e}"

# 可以在这里添加更多针对特定任务（如造型建议、故事生成）的封装函数
async def get_stylist_advice_qwen(theme: str, style: str) -> str:
    prompt = f"我正在参加一个婚礼，主题是'{theme}'，我的着装风格偏向'{style}'。请给我一些详细的婚礼宾客着装建议，包括服装款式、颜色搭配和配饰。请使用Markdown格式进行回复，例如使用标题、列表、加粗等来组织内容，使其易于阅读。"
    return await get_qwen_response(prompt)

async def create_love_story_qwen(keywords: list[str]) -> str:
    keywords_str = "、".join(keywords)
    prompt = f"请围绕以下关键词写一段浪漫的爱情故事：{keywords_str}。故事应该温馨感人，字数在200字左右。"
    # 可以选择不同的模型或调整参数以获得更适合故事创作的输出
    return await get_qwen_response(prompt, model="qwen-long") # 假设qwen-long更适合长文本 