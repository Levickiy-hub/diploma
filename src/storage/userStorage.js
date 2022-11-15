import {makeAutoObservable} from 'mobx'

export class UserStorage{
    constructor() {
        this._isAuth=false;
        this._user={};
        makeAutoObservable(this)
    }
    setIsAuth(bool){
        this._isAuth=bool;
    }
    get IsAuth(){
        return this._isAuth
    }
    setUser(user){
        this._user=user;
    }
    get user(){
        return this._user;
    }
}