import requests
from bs4 import BeautifulSoup
import yaml
import re

DOUBAN_ID = "143593978"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

data = {
    "movies": {"collect": [], "wish": []},
    "books": {"read": [], "wish": []}
}

def parse_movie(url, status_key):
    page = 0
    while True:
        res = requests.get(f"{url}?start={page*15}", headers=HEADERS)
        soup = BeautifulSoup(res.text, "html.parser")
        items = soup.select(".item")
        if not items:
            break
        for item in items:
            cover = item.select_one("img").get("src")
            title = item.select_one(".title a").text.strip()
            rating_el = item.select_one(".rating")
            rating = rating_el.text.strip() if rating_el else "无评分"
            comment_el = item.select_one(".comment")
            comment = comment_el.text.strip() if comment_el else ""
            date = re.search(r"(\d{4}-\d{2}-\d{2})", item.text)
            mark_date = date.group(1) if date else ""
            data["movies"][status_key].append({
                "title": title, "cover": cover, "rating": rating,
                "comment": comment, "date": mark_date
            })
        page += 1

def parse_book(url, status_key):
    page = 0
    while True:
        res = requests.get(f"{url}?start={page*15}", headers=HEADERS)
        soup = BeautifulSoup(res.text, "html.parser")
        items = soup.select(".item")
        if not items:
            break
        for item in items:
            cover = item.select_one("img").get("src")
            title = item.select_one(".title a").text.strip()
            rating_el = item.select_one(".rating")
            rating = rating_el.text.strip() if rating_el else "无评分"
            comment_el = item.select_one(".comment")
            comment = comment_el.text.strip() if comment_el else ""
            date = re.search(r"(\d{4}-\d{2}-\d{2})", item.text)
            mark_date = date.group(1) if date else ""
            data["books"][status_key].append({
                "title": title, "cover": cover, "rating": rating,
                "comment": comment, "date": mark_date
            })
        page += 1

# 电影：看过 / 想看
parse_movie(f"https://movie.douban.com/people/{DOUBAN_ID}/collect", "collect")
parse_movie(f"https://movie.douban.com/people/{DOUBAN_ID}/wish", "wish")
# 书籍：读过 / 想看
parse_book(f"https://book.douban.com/people/{DOUBAN_ID}/collect", "read")
parse_book(f"https://book.douban.com/people/{DOUBAN_ID}/wish", "wish")

# 写入Jekyll数据目录
with open("_data/douban.yml", "w", encoding="utf-8") as f:
    yaml.dump(data, f, allow_unicode=True, sort_keys=False)
