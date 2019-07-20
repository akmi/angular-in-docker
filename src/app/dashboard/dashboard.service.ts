import { Injectable } from '@angular/core';
import { RestService } from 'app/shared/rest/rest.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { QuestionCountGroupedByTagTypeDto, Lead } from './dashboard.model';
import { Candidate } from 'app/candidates/candidate.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
// http options used for making API calls
  private httpOptions: any;

// API for
  public api : string;

constructor(private http: HttpClient) {
  this.httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  this.api = environment.apiUrl + "" ;
}

public getAllLeadsForTest(test_id){
      return this.http.get( this.api + '/api/candidate-tests/?test='+test_id, this.httpOptions);
}

public getAllLeadTest(){
      return this.http.get( this.api + '/api/candidate-tests/', this.httpOptions);
}

public getLead(email){
      return this.http.get( this.api + '/api/candidates/?email=' + email, this.httpOptions);
}

public getAllLeads() {
      return this.http.get<Lead[]>( this.api + '/api/leads/?location_string=India', this.httpOptions);
}

/**
  * @name Add Questions to Test
  * @desc Adding a New test
  * @param {Test Object to Create }
  * @returns {Promise}
  */
  public addTestLead(test_id , candidate_id) {
    var test_candidate = { "test" : test_id , "candidate": candidate_id } ;
    console.log(test_candidate);
    return this.http.post( this.api + '/api/candidate-tests/',  test_candidate , this.httpOptions ) ;
  }

  /**
  * @name Add Questions to Test
  * @desc Adding a New test
  * @param { Test Object to Create }
  * @returns {Promise}
  */
  public addLead(first_name, last_name, email, mobile, location_type, location_string) {
    const lead = {
      'first_name': first_name,
      'last_name': last_name,
      'email': email,
      'mobile': mobile,
      'location_type': location_type,
      'location_string': location_string
    }
    return this.http.post( this.api + '/api/leads/', lead, this.httpOptions ) ;
  }

  public deleteLead(id) {
    return this.http.delete( this.api + '/api/leads/' + id + '/', this.httpOptions ) ;
  }

  public markCommunication(id, communication) {
    return this.http.put( this.api + '/api/mark_lead/' + id, {
      'communication': communication
    }, this.httpOptions ) ;
  }

}