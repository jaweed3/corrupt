from .models import Stats

def calculate_new_stats(current: dict, choice_data: dict) -> dict:
    """
    Menghitung stats baru berdasarkan JSON temanmu.
    JSON temanmu pakai integer (e.g., money: 50000, trust: -35).
    """
    # 1. Hitung
    new_money = current["money"] + choice_data.get("money", 0)
    new_trust = current["trust"] + choice_data.get("trust", 0)
    new_risk = current["risk"] + choice_data.get("risk", 0)

    # 2. Clamping (Batasan)
    # Trust & Risk mentok di 0-100
    new_trust = max(0, min(100, new_trust))
    new_risk = max(0, min(100, new_risk))
    
    # Money bebas (bisa minus kalau utang)
    
    return {
        "money": new_money,
        "trust": new_trust,
        "risk": new_risk
    }

def check_game_over(stats: dict, next_chapter_id: str) -> str:
    """
    Menentukan nasib player.
    """
    # 1. Cek Kondisi Kalah Statistik
    if stats["risk"] >= 100:
        return "GAME_OVER_BUSTED" # Ditangkap
    if stats["trust"] <= 0:
        return "GAME_OVER_FIRED"  # Dipecat/Didemo

    # 2. Cek Kondisi Tamat Cerita
    if next_chapter_id == "Selesai":
        return "WIN" # Tamat cerita

    return "ONGOING"
