import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import { Bloco } from 'src/app/model/bloco';

@Injectable({
  providedIn: 'root',
})
export class BlocoFormService {
  blocos;
  itemsRef: AngularFireList<any>;
  itemsFire: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.blocos = this.db.list('blocos/').valueChanges();

    this.itemsRef = this.db.list('blocos/');
    this.itemsFire = this.itemsRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  loadById(key: string) {
    return this.db.object<any>('blocos/' + key).valueChanges();
  }

  add(bloco: Partial<Bloco>) {
    return this.db.list('blocos/').push(bloco);
  }

  update(key: string, bloco: Partial<Bloco>) {
   return this.db.object('blocos/' + key).update(bloco);
  }
}
