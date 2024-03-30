# -*- coding: utf-8 -*-
"""
Created on Sun Feb 18 21:14:48 2024

@author: slaven.cvijetic
"""

import json

# some words still have the part of speech erroneously
def cleanHints(hints):
    for hint in hints:
        if 'word' in hint and 'hint' in hint:
            word = hint['word']
            print("precleaned word: " + word)
            word = word.split('noun')[0].strip()
            word = word.split('verb')[0].strip()
            word = word.split('adjective')[0].strip()
            word = word.split('adverb')[0].strip()
            print("my cleaned word: " + word)
            hint['word'] = word
    return hints

# update json objects
if __name__ == '__main__':
    # Load JSON data from a file
    with open('raw_all_levels_english_vocabulary.json', 'r') as file, open('hints.json', 'r') as answers:
            data = json.load(file)
            hints = json.load(answers)
            
            hints = cleanHints(hints)
    
            # Assuming data is a list of objects
            for item in data:
                item['hint'] = ""
                for hint in hints:
                    if 'word' in hint and 'hint' in hint:
                        if len(hint['word']) > 2\
                            and len(item['word'].split(' (')[0].strip()) > 1\
                            and item['word'].startswith(hint['word']):
                            print(item)
                            print(hint)
                            print()
                            # Update the property for each object in the list
                            item['hint'] = hint['hint']
                            hint['word'] = ""  # remove word as some are duplicated with different meanings
                            continue

    # Write the updated data back to the file
            with open('raw_new.json', 'w') as f:
                json.dump(data, f, indent=4)
