import { initializeApp, credential, messaging, app } from 'firebase-admin';
import { project } from './config';
import { Logger } from '../logger';

export class Firebase {
  private readonly logger: Logger = Logger.getInstance();
  public static firebase: Firebase;
  private constructor() {}
  private app!: app.App;
  public static async getFirebase(): Promise<Firebase> {
    if (!Firebase.firebase) {
      Firebase.firebase = new Firebase();
    }
    if (!Firebase.firebase.app) {
      Firebase.firebase.logger.log('*** Firebase connection initialize ***');
      Firebase.firebase.app = initializeApp({
        credential: credential.cert(project.serviceAccount as any),
        databaseURL: project.databaseURL,
      });
    }
    return Firebase.firebase;
  }

  public get(path: string): Promise<object | any> {
    return new Promise((resolve, reject) => {
      const db = this.app.database();
      const ref = db.ref(path);
      ref.on(
        'value',
        (snapshot) => {
          this.logger.log(
            '***********DATA RETRIEVE FROM DATABASE***********',
            JSON.stringify(snapshot.val()),
          );
          resolve(snapshot.val());
        },
        (errorObject) => {
          reject(errorObject);
        },
      );
    });
  }

  public getFilterByTime(
    path: string,
    startAt: string,
    endAt: string,
  ): Promise<object | any> {
    return new Promise((resolve, reject) => {
      const db = this.app.database();
      const ref = db.ref(path);
      ref
        .orderByChild('time')
        .startAt(new Date(startAt).getTime())
        .endAt(new Date(endAt).getTime())
        .once(
          'value',
          (snapshot) => {
            resolve(snapshot.val());
          },
          (errorObject) => {
            reject(errorObject);
          },
        );
    });
  }

  public getSnapshot(path: string): Promise<object | any> {
    return new Promise((resolve, reject) => {
      const db = this.app.database();
      const ref = db.ref(path);
      ref.on(
        'value',
        (snapshot) => {
          resolve(snapshot);
        },
        (errorObject) => {
          reject(errorObject);
        },
      );
    });
  }

  public async create(node: string, child: string, data: object | string) {
    const db = this.app.database();
    const ref = db.ref(node);
    const usersRef = ref.child(child);
    await usersRef.set(data);
    return;
  }

  public async push(node: string, data: object | string) {
    const db = this.app.database();
    const ref = db.ref(node);
    await ref.push(data);
    return;
  }

  public async update(node: string, child: string, data: object) {
    const db = this.app.database();
    const ref = db.ref(node);
    const usersRef = ref.child(child);
    await usersRef.update(data);
    return;
  }

  public async delete(node: string, child: string) {
    const db = this.app.database();
    const ref = db.ref(node);
    const usersRef = ref.child(child);
    await usersRef.remove();
    return;
  }

  public async sendMessage(
    token: string,
    notification: { title: string; body: string },
    additionalData?: any,
  ) {
    try {
      await messaging(this.app).send({
        notification,
        token,
        data: additionalData,
      });
    } catch (error) {
      console.log(error);
    }
    return;
  }

  public where(
    path: string,
    child: string,
    value: string,
  ): Promise<object | any> {
    return new Promise((resolve, reject) => {
      const db = this.app.database();
      const ref = db.ref(path);
      ref
        .orderByChild(child)
        .equalTo(value)
        .on('value', (snapshot) => {
          resolve(snapshot.val());
        });
    });
  }
}
