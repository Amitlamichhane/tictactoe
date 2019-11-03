
import imp
import os 
import pandas as pd 
import numpy as np
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.model_selection import cross_val_score
from sklearn.model_selection import train_test_split
from sklearn.model_selection import GridSearchCV
from sklearn.metrics import confusion_matrix
from sklearn.externals import joblib
from sklearn.externals.joblib import dump,load
from sklearn import tree
from . import clean_data as cd 
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


def decision_tree(feature, target):
    clf = DecisionTreeClassifier(random_state = 42 )
    #clf = clf.fit(feature,target)
    parameter_grid = {'max_depth': [1, 2, 3, 4, 5, 6,7,8 ,9 ,10],
                  'max_features': [1, 2, 3, 4]}

    clf = GridSearchCV(clf,parameter_grid,cv=10)
    clf =clf.fit(feature,target.values.ravel())
    print(clf.best_params_)
    print(clf.best_score_)

    save_models(clf,"decision_tree.joblib")
    

def random_forest(feature, target):
    clf = RandomForestClassifier(random_state = 42 )
    #clf = clf.fit(feature,target)
    parameter_grid = {'max_depth': [1, 2, 3, 4, 5, 6,7,8 ,9 ,10],
                  'max_features': [1, 2, 3, 4]}

    clf = GridSearchCV(clf,parameter_grid,cv=10)
    clf =clf.fit(feature,target.values.ravel())
    print(clf.best_params_)
    print(clf.best_score_)

    save_models(clf,"random_forest.joblib")


def naive_bayes(feature, target):
    
    naive_model = GaussianNB()
    naive_model.fit(feature,target)
    ##grid search cross -fold
    save_models(naive_model,"naive_bayes_model.joblib")

def svm(feature, target):
    pass


def predict_using_model(x,y,filename= "./random_forest.joblib"):

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

def probability_predict(x,filename = 'random_forest.joblib'):
    fi = os.getcwd()+'/model/'+filename
    #change null to b 
    x.replace("null","b",inplace=True)
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
    
    data =  cd.change_data(x,False)
    new_data = pd.DataFrame()
    for i in cls_group:
        if i not in data.columns:
            new_data[i]=0
        else:
            new_data[i] = data[i]
    print(new_data.columns)
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
    seed= 42
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3,random_state = seed)
    #train for decision tree 
    #random_forest(X_train,y_train)
    ##decision tree
    predict_using_model(X_test,y_test)



    
    
      

    
