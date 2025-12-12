def calculate_new_stats(current: dict, choice_data: dict) -> dict:
    """
    Menghitung stats baru.
    Input: Current stats (dict), Choice data dari JSON (dict)
    """
    # 1. Hitung perubahan
    # Menggunakan .get(key, 0) biar gak error kalau fieldnya lupa ditulis di JSON
    d_money = choice_data.get("money", 0)
    d_trust = choice_data.get("trust", 0)
    d_risk = choice_data.get("risk", 0)

    new_money = current["money"] + d_money
    new_trust = current["trust"] + d_trust
    new_risk = current["risk"] + d_risk

    # 2. Clamping (Batasan)
    # Trust & Risk: 0 - 100
    new_trust = max(0, min(100, new_trust))
    new_risk = max(0, min(100, new_risk))
    
    # Money: Bebas (bisa minus kalau utang)
    
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
        return "GAME_OVER_BUSTED" # Ditangkap KPK (Risk Penuh)
    
    if stats["trust"] <= 0:
        return "GAME_OVER_FIRED"  # Dipecat/Didemo (Trust Habis)

    # 2. Cek Kondisi Tamat Cerita (Sesuai keyword di JSON temanmu: "Selesai")
    if next_chapter_id == "Selesai":
        return "WIN" # Berhasil bertahan sampai akhir

    return "ONGOING"
