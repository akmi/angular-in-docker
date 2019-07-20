import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TableData } from '../md/md-table/md-table.component';
import { DashboardService } from './dashboard.service';
import swal from 'sweetalert2';
import { Candidate } from 'app/candidates/candidate.model';
declare const $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit, AfterViewInit {
  public leads: any;

  constructor(private dashboardService: DashboardService) {
    this.leads = [] ;
  }

  public updateData(data) {
    this.leads = data;
  }

  public updateNewLead(data) {
    this.leads.push(data) ;
  }

  public alertFn(error) {
    console.log(error);
    alert('Error getting Data');
  }

  public ngOnInit() {
    this.init()
    this.getLeads();
  }

  public onScroll() {
  }

  private getLeads() {
    this.dashboardService.getAllLeads().subscribe(
      data => {
        if (data) {
          this.updateData(data);
        }
      },
      err => {
        console.error('error', err);
      }
    );
  }

  public ngAfterViewInit() {
  }

  private init() {
    this.leads = new Array<any>();
  }

  openAddLeadModal() {
    const self  = this;
    swal({
      title: 'Add Lead',
      html: '<div class="form-group">' +
          'First Name: <input name="first_name" id="first_name" type="text" placeholder="Enter first name.." class="form-control" /><br>' +
          'Last Name: <input name="last_name" id="last_name" type="text" placeholder="Enter last name.."  class="form-control" /><br>' +
          'Email: <input name="email" id="email" type="text" placeholder="Enter email.."  class="form-control" />' +
          'Mobile: <input name="mobile" id="mobile" type="text" placeholder="Enter mobile number.."  class="form-control" />' +
          'Location Type: ' +
          '<select id="location_type" name="location_type">' +
            '<option value="Country">Country</option>' +
            '<option value="City">City</option>' +
          '</select><br>' +
          'Location: <input name="location_string" id="location_string" type="text" ' +
              'placeholder="Enter location.." class="form-control" />' +
          '</div style="text-align: center;">',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      onOpen: function() {
        $('.swal2-confirm').attr('id', 'save');
        $('.swal2-cancel').attr('id', 'cancel');
      }
    }).then(function(result) {
      if (result && result.value) {
        self.submitLeadForm();
      }
    }).catch(swal.noop)
  }

  submitLeadForm(){
      this.dashboardService.addLead( $('#first_name').val(), $('#last_name').val(), $('#email').val(), 
                                    $('#mobile').val(), $('#location_type').val(), $('#location_string').val()).subscribe(
          data => {
            this.getLeads();
          },
          err => {
            console.log(err);
          }
      );

  }

  openDeleteLeadModal(lead) {
    const self = this;
    swal({
      title: 'Are you sure?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      confirmButtonText: 'Delete',
      buttonsStyling: false,
      onOpen: function() {
        $('.swal2-confirm').attr('id', 'delete-modal');
        $('.swal2-cancel').attr('id', 'cancel-modal');
      }
    }).then((result) => {
      if (result && result.value) {
        self.delete(lead);
      }
    })
  }

  delete(lead) {
    this.dashboardService.deleteLead(lead.id).subscribe(
          data => {
            this.getLeads();
          },
          err => {
            console.log(err);
          }
      );
  }

  openMarkCommunicationModal(lead) {
    const self  = this;
    swal({
      title: 'Mark Communication',
      html: '<div class="form-group">' +
          'Mark Communication: <textarea name="mark_communication" id="mark_communication" rows="10" cols="30"></textarea><br>',          
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      confirmButtonText: 'Mark Communication',
      buttonsStyling: false,
      onOpen: function() {
        $('.swal2-confirm').attr('id', 'mark');
      }
    }).then(function(result) {
      if (result && result.value) {
        self.markCommunication(lead);
      }
    }).catch(swal.noop)
  }

  markCommunication(lead) {
    this.dashboardService.markCommunication(lead.id, $('#mark_communication').val()).subscribe(
      data => {
        this.getLeads();
      },
      err => {
        console.log(err);
      }
  );
  }

}
