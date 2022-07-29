import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {ActivatedRoute} from "@angular/router";
import {combineLatest, map, Observable, Subscription, switchMap, take} from "rxjs";
import {CallService} from "../../services/call.service";
import {Call} from "../../../../core/models/call.model";
import {AuthService} from "../../../auth/services/auth.service";
import {User} from "../../../../core/models/user.model";

const servers = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};

@Component({
  selector: 'app-callroom',
  templateUrl: './callroom.component.html',
  styleUrls: ['./callroom.component.css']
})
export class CallroomComponent implements OnInit {

  @ViewChild('myStream') myStreamVideoElement!: ElementRef;
  @ViewChild('otherStream') otherStreamVideoElement!: ElementRef;

  pc: RTCPeerConnection = new RTCPeerConnection(servers);
  myStream: any;
  otherStream: any;
  currentCallId: any;

  offers$!: Observable<any>;
  answers$!: Observable<any>;
  currentCallData$!: Observable<any>;
  user$!: Observable<any>;
  userData!: any;
  callData!: Call;
  subscription = new Subscription();
  offers: any;
  answers: any;

  test: any;

  constructor(private firestore: AngularFirestore,
              private route: ActivatedRoute,
              private callService: CallService,
              private authService: AuthService) {

  }

  async ngOnInit() {
    this.route.params.pipe(take(1)).subscribe((params) => {
      this.currentCallId = params['roomId'];
    })

    console.log(this.currentCallId);

    this.currentCallData$ = this.route.params.pipe(
      switchMap(params => {
        return this.callService.get(params['callId']);
      })
    );

    this.user$ = this.authService.getUserData();

     combineLatest([
      this.currentCallData$,
      this.user$
    ]).pipe(take(1)).subscribe(([callData, user]) => {
      this.userData = user;
      this.callData = callData;
    })

    this.join();
  }

  async join() {
    console.log("cd", this.callData)
    console.log("us", this.userData)

    this.myStream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
    this.otherStream = new MediaStream();

    this.myStream.getTracks().forEach((track: any) => {
      this.pc.addTrack(track, this.myStream);
    })

    this.pc.ontrack = event => {
      event.streams[0].getTracks().forEach((track) => {
        this.otherStream.addTrack(track);
      });
    }

    this.myStreamVideoElement.nativeElement.srcObject = this.myStream;
    this.otherStreamVideoElement.nativeElement.srcObject = this.otherStream;
  }

  async createOffer(callId: string) {

    const newCallDocument = this.firestore.collection('calls').doc(callId);
    const offerCandidates = newCallDocument.collection('offer_candidates');
    const answerCandidates = newCallDocument.collection('answer_candidates');

    // @ts-ignore
    this.currentCallId = newCallDocument.id;

    this.pc.onicecandidate = event => {
      event.candidate && offerCandidates.add(event.candidate.toJSON());
    }

    const offerDescription = await this.pc.createOffer();
    await this.pc.setLocalDescription(offerDescription);

    await newCallDocument.update({
      offer: {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      }
    });

    newCallDocument.snapshotChanges()
      .pipe(
        map(doc => {
          const data = doc.payload.data() as any;
          if (!this.pc.currentRemoteDescription && data?.answer) {
            const answerDescription = new RTCSessionDescription(data.answer);
            this.pc.setRemoteDescription(answerDescription);
          }
          return {...data};
        })
      ).subscribe();

    // Listen for remote ICE candidates
    answerCandidates.snapshotChanges().pipe(
      map(change => change.map(c => {
        const data = c.payload.doc.data() as any;
        if (c.type === 'added') {
          const candidate = new RTCIceCandidate(data);
          this.pc.addIceCandidate(candidate);
        }
        return {...data};
      }))
    ).subscribe();
  }

  async createAnswer(callId: string) {
    console.log("Joining ...", callId);
    const activeCallDocument = this.firestore.collection('calls').doc(callId);
    const offerCandidates = activeCallDocument.collection('offer_candidates');
    const answerCandidates = activeCallDocument.collection('answer_candidates');

    activeCallDocument.snapshotChanges()
      .pipe(
        map(doc => {
          if (doc.payload.exists) {
            return {...doc.payload.data() as any};
          }
        })
      ).pipe(take(1)).subscribe(async (data) => {

      await this.pc.setRemoteDescription(new RTCSessionDescription(data.offer));

      const answerDescription = await this.pc.createAnswer();
      await this.pc.setLocalDescription(answerDescription);

      await activeCallDocument.update({
        answer: {
          type: answerDescription.type,
          sdp: answerDescription.sdp,
        }
      });
    });

    this.pc.onicecandidate = event => {
      event.candidate && answerCandidates.add(event.candidate.toJSON());
    };

    offerCandidates.snapshotChanges().pipe(
      map(snapshotChange => snapshotChange.map(change => {
        const data = change.payload.doc.data() as any;
        if (change.type === 'added') {
          this.pc.addIceCandidate(new RTCIceCandidate(data));
        }
        return {...data};
      }))
    ).subscribe();
  }

  leave() {

  }
}
