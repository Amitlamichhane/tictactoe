import os 
import pandas as pd 
import numpy as np

from sklearn.neighbors import KNeighborsClassifier


from sklearn.model_selection import cross_val_score
from sklearn.model_selection import train_test_split
from sklearn.model_selection import GridSearchCV
from sklearn.metrics import confusion_matrix

from joblib import dump,load


import warnings
warnings.simplefilter(action='ignore', category=FutureWarning)

from model.clean_data import change_data as cd
#from clean_data import change_data as cd

def save_models(model_name, file):
   dump(model_name,"./{}".format(file))
"""
Four different classification model is going to be use and tested 
Each model are saved for prediction using sklern.externals
and some few probablistic classification
"""
"""
"""
def knn_model(feature, target):
    #training with train test score 
    knn = KNeighborsClassifier()
    ##grid search cross -fold
    knn_params = {"n_neighbors":np.arange(1,25)}
    knn_gscv = GridSearchCV(knn, knn_params,cv=10)
    knn_gscv.fit(feature,target.values.ravel())
    print(knn_gscv.best_params_)
    print(knn_gscv.best_score_)
    save_models(knn_gscv,"knn_model.joblib")



def predict_using_model(x,y,filename= "./knn_model.joblib"):
    model = load(filename)
    y_pred = model.predict(x)
    matrix = confusion_matrix(y , y_pred)
    print({
        "accuracy": float((matrix[0][0]+matrix[1][1])/(sum(matrix[0])+sum(matrix[1]))),
        "no_correct" : int(matrix[0][0]),
        "no_incorrect" : int(matrix[0][1]),
        "yes_correct" : int(matrix[1][1]),
        "yes_incorrect" : int(matrix[1][0])
        })

def probability_predict(x,filename = 'knn_model.joblib'):
    fi = os.getcwd()+'/model/'+filename
    #change null to b 
    x.replace("null","b",inplace=True)
    
    x = x.applymap(lambda s:s.lower() if type(s) == str else s)
    #change missing columns with 0 
    cls_group = ['top_left_square_b', 'top_left_square_o', 'top_left_square_x',
       'top_middle_square_b', 'top_middle_square_o', 'top_middle_square_x',
       'top_right_square_b', 'top_right_square_o', 'top_right_square_x',
       'middle_left_square_b', 'middle_left_square_o', 'middle_left_square_x',
       'middle_middle_square_b', 'middle_middle_square_o',
       'middle_middle_square_x', 'middle_right_square_b',
       'middle_right_square_o', 'middle_right_square_x',
       'bottom_left_square_b', 'bottom_left_square_o', 'bottom_left_square_x',
       'bottom_middle_square_b', 'bottom_middle_square_o',
       'bottom_middle_square_x', 'bottom_right_square_b',
       'bottom_right_square_o', 'bottom_right_square_x']
    data =  cd(x,False)
    new_data = pd.DataFrame()
    for i in cls_group:
        if i not in data.columns:
            new_data[i]=0
        else:
            new_data[i] = data[i]
    
    model = load(fi)
    new_data = np.nan_to_num(new_data)
    probab = model.predict_proba(new_data)
    return ({
        "x": probab[0][0],
        "o": probab[0][1],
    })
if __name__ == "__main__":
    data = pd.read_csv("./../data/model.csv")
    X, y = np.split(data, [-1], axis=1)
    seed= 21
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3,random_state = seed)   
    #random forest 
    knn_model(X_train,y_train)
    predict_using_model(X_test,y_test,"./knn_model.joblib")



    
    
      

    
