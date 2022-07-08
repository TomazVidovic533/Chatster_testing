import {Observable} from "rxjs";

interface IBaseEntity<T> {
  get(id: string): Observable<T>;
  list(): Observable<T[]>;
  add(item: T): Promise<T>;
  update(item: T): Promise<T>;
  delete(id: string): void;
}

export abstract class BaseService<T extends IBaseEntity> implements IBaseService<T> {

  protected collection: AngularFirestoreCollection<T>;

  constructor(path: string, protected afs: AngularFirestore, private logger: ILogger) {
    this.collection = this.afs.collection(path);
  }

}
