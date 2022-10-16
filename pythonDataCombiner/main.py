import os
import json

dir_path = "JSON\\"
out_file = "geo_data.json"

names_set = set()

count = 0
sum = 0


def parse_file_data(file):
    global count
    global sum
    geo_data = []
    file_data = json.load(file)
    for feature in file_data["features"]:
        if feature["attributes"]["NAZWAOSIEDLA"] in names_set:
            continue

        area = {"Name": feature["attributes"]["NAZWAOSIEDLA"]}
        points = []
        for ring in feature["geometry"]["rings"][0]:
            points.append({'XPosition': ring[0], 'YPosition': ring[1]})
        area["Points"] = points
        geo_data.append(area)

        names_set.add(area["Name"])
        sum += len(area["Points"])
        count += 1
    return geo_data


def read_data_from_files_in_dir(path):
    files_data = []
    for filename in os.listdir(path):
        file_path = os.path.join(path, filename)
        if os.path.isfile(file_path):
            with open(file_path, 'r', encoding="utf-8") as f:
                files_data.extend(parse_file_data(f))
    return files_data


def save_json_to_file(data, file):
    with open(file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False)


if __name__ == "__main__":
    data = read_data_from_files_in_dir(dir_path)
    save_json_to_file(data, out_file)
    print("count: " + str(count))
    print("sum: " + str(sum))
    print('average: ' + str(sum/count))
