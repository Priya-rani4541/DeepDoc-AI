import json
import os
from datetime import datetime

from config import CHAT_HISTORY_FILE


def save_chat(query, response):

    history = []

    # Load existing history
    if os.path.exists(CHAT_HISTORY_FILE):

        with open(CHAT_HISTORY_FILE, "r") as f:
            try:
                history = json.load(f)
            except:
                history = []

    # Add new record
    history.append({
        "query": query,
        "response": response,
        "timestamp": str(datetime.now())
    })

    # Save history
    with open(CHAT_HISTORY_FILE, "w") as f:
        json.dump(history, f, indent=4)