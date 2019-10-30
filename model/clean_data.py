import pandas as pd 


"""
changing x to 1 
         0 to 2 
         b to 0 
         negative to 0 
         positive to 1 
"""
def map_conditon(x):
    if x =='x' or x == 'X':
        return 1 
    elif x =='o' or x =='O':
        return 2 
    elif x =='b' or  x == null:
        return 0
    elif x=="negative":
        return 0
    else:
        return 1

def change_data(data):
    data = data.applymap(map_conditon)
    return data

if __name__ =="__main__":
    data = pd.read_csv('./../data/tic_tac_toe_dataset.csv')
    data = change_data(data)
    data.to_csv('./../data/model.csv', index= False)