
import imp
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
    clf = DecisionTreeClassifier(random_state = 0 )
    #clf = clf.fit(feature,target)
    parameter_grid = {'max_depth': [1, 2, 3, 4, 5],
                  'max_features': [1, 2, 3, 4]}

    clf = GridSearchCV(clf,parameter_grid,cv=10)
    clf =clf.fit(feature,target.values.ravel())
    print(clf.best_params_)
    print(clf.best_score_)


    dot_data = tree.export_graphviz(clf, out_file=None) 
    graph = graphviz.Source(dot_data) 
    graph.render("ok") 
    save_models(clf,"decision_tree.joblib")
    

def random_forest(feature, target):
    pass

def naive_bayes(feature, target):
    
    naive_model = GaussianNB()
    naive_model.fit(feature,target)
    ##grid search cross -fold
    save_models(naive_model,"naive_bayes_model.joblib")

def svm(feature, target):
    pass


def predict_using_model(x,y,filename= "./knn_model.joblib"):
    model = load(filename)
    y_pred = model.predict(x)
    print(y_pred)
    print(model.predict_proba(x))
    matrix = confusion_matrix(y , y_pred)
    print({
        "accuracy": float((matrix[0][0]+matrix[1][1])/(sum(matrix[0])+sum(matrix[1]))),
        "no_correct" : int(matrix[0][0]),
        "no_incorrect" : int(matrix[0][1]),
        "yes_correct" : int(matrix[1][1]),
        "yes_incorrect" : int(matrix[1][0])
        })

def probability_predict(x,filename = './decision_tree.joblib'):
    #model = load('./decision_tree.joblib')
    # probab = model.predict_proba(x)
    # return ({
    #     "X winning chance ": probab[0],
    #     "O winning chance ": probab[1],
    # })
    print(filename)
    pass
if __name__ == "__main__":
    data = pd.read_csv("./../data/model.csv")
    X, y = np.split(data, [-1], axis=1)
    seed= 2000
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3,random_state = seed)
    
    ##knn_models
    knn_model(X_train,y_train)
    predict_using_model(X_test,y_test, filename="./knn_model.joblib")
    #naive_bayes
    # naive_bayes(X_train,y_train)
    # predict_using_model(X_test,y_test, filename= "./naive_bayes_model.joblib")
    #decision_tree very unstable
    # decision_tree(X_train,y_train)
    # predict_using_model(X_test,y_test,filename="./decision_tree.joblib")





    
    
      

    
