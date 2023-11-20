# -*- coding: utf-8 -*-
"""
Created on Mon Nov 20 06:59:43 2023

@author: slaven.cvijetic
"""

# modify json data
import json

if __name__ == "__main__":
    levels = ["A1", "A2", "B1", "B2", "C1", "C2", "all_levels"]
    for level in levels:
        with open("C:\\Users\\slaven.cvijetic\\Desktop\\projects\\LinguaBlitz\\data\\"+level+"_english_vocabulary.json")\
            as file:
            data = json.load(file)
            for i in range(len(data)):
                data[i]["category"] = ""
                data[i]["flashcard"] = False
                data[i]["bookmark"] = False
            
            f = open(level+"_english_vocabulary.json", "w")
            json.dump(data, f, ensure_ascii=False, indent=4)
