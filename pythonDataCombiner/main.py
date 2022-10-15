import os
import json

dir_path = "JSON\\"
out_file = "geo_data.json"

names_set = set()
geo_data = []

for filename in os.listdir(dir_path):
    file_path = os.path.join(dir_path, filename)
    if os.path.isfile(file_path):
        with open(file_path, 'r', encoding="utf-8") as f:
            data = json.load(f)
            for feature in data["features"]:
                area = {"Name": feature["attributes"]["NAZWAOSIEDLA"]}
                points = []
                for ring in feature["geometry"]["rings"][0]:
                    points.append({'XPosition': ring[0], 'YPosition': ring[1]})
                area["Points"] = points
                geo_data.append(area)

with open(out_file, 'w', encoding='utf-8') as f:
    json.dump(geo_data, f, ensure_ascii=False)
