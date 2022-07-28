import {Component, OnInit} from '@angular/core';
import {AngularFireFunctions} from "@angular/fire/compat/functions";
import {Observable} from "rxjs";
import * as Stripe from "stripe";
import {loadStripe} from "@stripe/stripe-js";


@Component({
  selector: 'app-pricing-overview',
  templateUrl: './pricing-overview.component.html',
  styleUrls: ['./pricing-overview.component.css']
})
export class PricingOverviewComponent implements OnInit {

  data$!: Observable<any>;

  constructor(private functions: AngularFireFunctions) {
  }

  ngOnInit(): void {
  }

  async createPurchaseSession() {
    const stripe = await loadStripe('pk_test_51LOmISGgB96LAeCnOmAkuNdnrMCo8kJUIrlBzgoZWf8a91CeUIpN1LRyfwkDnAPudChDwj0sXHTtAQnjuqYPraEQ001XD4PQwO');
    this.functions.httpsCallable('purchaseProMembership')({}).subscribe((r) => {
        console.log(r);
        stripe?.redirectToCheckout({sessionId: r})
      }
    );



  }
}
