# -*- coding: utf-8 -*-
"""
Created on Tue Jun 13 19:55:00 2023

@author: slaven
"""

import json
import requests

from bs4 import BeautifulSoup as bs


"""
@param level, A1 till C2 used for filtering and creating filename
@param data, raw dataset to be filtered
"""
def saveByLevel(level, data):
    extracted = []
    
    for value in data:
        currentLevel = value['level']
        
        if currentLevel == level:
            extracted.append(value)
    
    with open(level+'_english_vocabulary.json', 'w', encoding='utf-8') as f:
        json.dump(extracted, f, ensure_ascii=False, indent=4)


def findSynonyms(word, partOfSpeech):
    synonyms = []
    maxNumberOfSynonyms = 3
    
    # only check for noun and verb, ignore other types, since the other website
    # has different definitions and inconsistencies with the vocabulary data
    if not (partOfSpeech == "noun" or partOfSpeech == "verb"):
        partOfSpeech = ""
    
    url = "https://www.thesaurus.com/browse/"+word.split(" (")[0]
    page = requests.get(url)
    
    if page.status_code == 200:
        content = page.content
        
        # extract data
        DOM = bs(content, "html.parser")
        sections = DOM.find_all("div", {"data-type": "synonym-and-antonym-card"})
        for href in sections:
            if partOfSpeech in href.text and ("Strongest match" in href.text or "Strongest matches" in href.text):
                ul = href.find_all("ul")
                for elem in ul:
                    for li in elem.find_all("li"):
                        if not li.text in synonyms and len(synonyms) < maxNumberOfSynonyms:
                            synonyms.append(li.text)
                    break
            
            # if none can be found, look for other strong matches
            if len(synonyms) == 0:
                if partOfSpeech in href.text and ("Strong match" in href.text or "Strong matches" in href.text):
                    ul = href.find_all("ul")
                    for elem in ul:
                        for li in elem.find_all("li"):
                            if not li.text in synonyms and len(synonyms) < maxNumberOfSynonyms:
                                synonyms.append(li.text)
                        break
            
            # if no strong matches are found, try weak matches
            if len(synonyms) == 0:
                if partOfSpeech in href.text and ("Weak match" in href.text or "Weak matches" in href.text):
                    ul = href.find_all("ul")
                    for elem in ul:
                        for li in elem.find_all("li"):
                            if not li.text in synonyms and len(synonyms) < maxNumberOfSynonyms:
                                synonyms.append(li.text)
                        break
        print(synonyms)
        return synonyms
    

if __name__ == '__main__':
    end = 6778
    detailIds = [i for i in range(1,end+1)]
    data = []
    
    for detailId in detailIds:
        print('Fetching ID: %i' %detailId)
        url = "https://www.englishprofile.org/british-english/words/detail/"+str(detailId)
        page = requests.get(url)
        
        if page.status_code == 200:
            content = page.content
            description = ''
            
            # extract data
            DOM = bs(content, 'html.parser')
            headersWithSections = DOM.findAll('div', {'class': 'pos_section'})
            
            for headerIdx, headerWithSections in enumerate(headersWithSections):
                sections = headerWithSections.findAll('div', {'class': 'info sense'})
                partOfSpeech = headerWithSections.findAll('span', {'class': 'pos'})[0].text
                
                if len(sections):
                    for idx, section in enumerate(sections):
                        description = ''  # reset so that descriptions from a previous nuanced meaning do not fill up the next description
                        word = section.findAll('div', {'class': 'sense_title'})[0].text
                        blockquote = section.findAll('p', {'class': 'blockquote'})
                        example = section.findAll('p', {'class': 'learnerexamp'})
                        level = section.findAll('span', {'class': 'label'})
                        synonyms = findSynonyms(word, partOfSpeech)
                        
                        # ignore those words without a level
                        if len(level):
                            level = level[0].text
                        else:
                            continue  # go to the next iteration
                        
                        
                        # some words have more than one short blockquote
                        for quote in blockquote:
                            description += quote.text + '\n'
                        description = description[:-2]  # remove last newline
                        
                        # some words are without a longer example
                        if (len(example)):
                            example = example[0].text.split(' (')[0]  # remove cite information
                        else:
                            example = ''
                        
                        data.append({
                            'id': str(detailId)+'_'+str(headerIdx)+'_'+str(idx),
                            'word': word,
                            'level': level, 
                            'description': description,
                            'example': example,
                            'partOfSpeech': partOfSpeech,
                            'synonyms': synonyms,
                            'category': '',
                            'bookmark': False,
                            'flashcard': False
                        })
    
    
    # save all of the data
    with open('all_levels_english_vocabulary.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
    
    # save the data based on levels
    saveByLevel('A1', data)
    saveByLevel('A2', data)
    saveByLevel('B1', data)
    saveByLevel('B2', data)
    saveByLevel('C1', data)
    saveByLevel('C2', data)
    
    
    # dataA1 = {}
    # dataA2 = {}
    # dataB1 = {}
    # dataB2 = {}
    # dataC1 = {}
    # dataC2 = {}
    
    # for key, value in data.items():
    #     level = value['level']
        
    #     if level == 'A1':
    #         dataA1[key] = value
    #     elif level == 'A2':
    #         dataA2[key] = value
    #     elif level == 'B1':
    #         dataB1[key] = value
    #     elif level == 'B2':
    #         dataB2[key] = value
    #     elif level == 'C1':
    #         dataC1[key] = value
    #     elif level == 'C2':
    #         dataC2[key] = value
    
    
    # with open('A1_english_vocabulary.json', 'w', encoding='utf-8') as f:
    #     json.dump(dataA1, f, ensure_ascii=False, indent=4)
    # with open('A2_english_vocabulary.json', 'w', encoding='utf-8') as f:
    #     json.dump(dataA2, f, ensure_ascii=False, indent=4)
    # with open('B1_english_vocabulary.json', 'w', encoding='utf-8') as f:
    #     json.dump(dataB1, f, ensure_ascii=False, indent=4)
    # with open('B2_english_vocabulary.json', 'w', encoding='utf-8') as f:
    #     json.dump(dataB2, f, ensure_ascii=False, indent=4)
    # with open('C1_english_vocabulary.json', 'w', encoding='utf-8') as f:
    #     json.dump(dataC1, f, ensure_ascii=False, indent=4)
    # with open('C2_english_vocabulary.json', 'w', encoding='utf-8') as f:
    #     json.dump(dataC2, f, ensure_ascii=False, indent=4)
    
