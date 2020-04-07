import pandas as pd 
from sklearn.preprocessing import LabelEncoder, OneHotEncoder
from sklearn.model_selection import train_test_split
import numpy as np
import imp

def change_data(data, Flag_y = True ):
    
    if (Flag_y ==True):
    
        categorical = ['top_left_square', 'top_middle_square', 'top_right_square','middle_left_square',\
             'middle_middle_square', 'middle_right_square','bottom_left_square', 'bottom_middle_square', 'bottom_right_square']
        X = data[categorical]
        X_new = pd.get_dummies(X)
        lb_make = LabelEncoder()
        data.drop(categorical,inplace=True,axis=1)
        data["class"] = lb_make.fit_transform(data["class"])
        data.reset_index(drop = True, inplace= True)
        X_new.reset_index(drop = True, inplace= True)
        bigdata= bigdata = pd.concat([X_new, data], axis= 1)
        return bigdata
    else:
        categorical = ['top_left_square', 'top_middle_square', 'top_right_square','middle_left_square',\
             'middle_middle_square', 'middle_right_square','bottom_left_square', 'bottom_middle_square', 'bottom_right_square']
        X = data[categorical]
        data.drop(categorical,inplace=True,axis=1)
        X_new = pd.get_dummies(X)

        return X_new
