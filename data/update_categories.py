# -*- coding: utf-8 -*-
"""
Created on Sun Feb 18 21:14:48 2024

@author: slaven.cvijetic
"""

import json

# update json objects
if __name__ == '__main__':
    # Load JSON data from a file
    with open('all_levels_english_vocabulary.json', 'r') as file,\
         open('temp_chatgpt_answers.json', 'r') as answers:
            data = json.load(file)
            categories = json.load(answers)
    
            # Assuming data is a list of objects
            for item in data:
                for category in categories:
                    if category['word'] == item['word']:
                        # Update the property for each object in the list
                        item['category'] = category['category']
            
            # Write the updated data back to the file
            with open('all_levels_english_vocabulary.json', 'w') as f:
                json.dump(data, f, indent=4)