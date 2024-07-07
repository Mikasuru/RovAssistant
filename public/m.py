import json
import os

# รายชื่อไฟล์ที่ต้องการสร้าง
file_names = [
    "Zip", "Annette", "Aya", "Helen", "Lumburr", "Arum", "Xeniel", "Alice", "Baldum",
    "Chaugnar", "Omega", "Cresht", "Krizzix", "Gildur", "Rouie", "Ishar", "Sephera",
    "Taara", "Skud", "Maloch", "Roxie", "Arduin", "Y'bneth", "Dextra", "Ormarr", "Max",
    "Wiro", "Ata", "Zata", "Krixi", "Kahlii", "Lorion", "Aleister", "Lauriel", "Ilumia",
    "Natalya", "Veera", "Diao Chan", "Mganga", "Raz", "Tulen", "Liliana", "Ignis",
    "Jinna", "Preyta", "Marja", "Azzen'Ka", "D'Arcy", "Dirak", "Iggy", "Bonnie", "Yue",
    "Florentino", "Veres", "Zuka", "Omen", "Wonder Woman", "Amily", "Volkath", "Riktor",
    "Zephys", "Zanis", "Qi", "Airi", "Yena", "Allain", "Butterfly", "Ryoma", "Mortos",
    "Yan", "Kil'Groth", "Lubu", "Superman", "Errol", "Astrid", "Rourke", "Tachi", "Bijan",
    "Wukong", "Nakroth", "Kaine", "Murad", "Kirknak", "Keera", "Bright", "Sinestrea",
    "Quillen", "Enzo", "Zill", "Paine", "The Flash", "Aoi", "Yorn", "Valhein", "Elsu",
    "Violet", "Hayate", "Laville", "Tel'Annas", "Celica", "Slimz", "Thorne", "Capheny",
    "Lindis", "Elend'orr", "Fennik", "Moren", "Skuart", "Wisp", "Teeri", "Ming", "Erin",
    "Charlot"
]

# ตัวอย่างข้อมูลที่จะเขียนในไฟล์ skills.json
skills_data = {
    "skill1": {"cooldown": 5},
    "skill2": {"cooldown": 10}
}

# สร้างไฟล์และเขียนข้อมูลลงในไฟล์
for name in file_names:
    file_path = os.path.join(name, "skills.json")
    
    # สร้างไดเรกทอรีหากยังไม่มี
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    
    # เขียนข้อมูลลงในไฟล์
    with open(file_path, 'w') as f:
        json.dump(skills_data, f, indent=4)

print("สร้างไฟล์และเขียนข้อมูลสำเร็จ")
