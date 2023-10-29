# Python script to convert txt file to json
import json

# Open the txt file and read the lines
with open("card.txt", "r") as f:
    lines = f.readlines()

# Create an empty list to store the json objects
json_list = []

# Loop through each line and parse the data
for line in lines:
    # Split the line by comma and strip any whitespace
    data = [x.strip() for x in line.split(",")]
    # Create a dictionary with the keys and values
    json_dict = {"question": data[0], "answer": data[1], "wildcard": data[2]}
    # Append the dictionary to the list
    json_list.append(json_dict)

# Open the json file and write the list
with open("card.json", "w") as f:
    json.dump(json_list, f, indent=4)