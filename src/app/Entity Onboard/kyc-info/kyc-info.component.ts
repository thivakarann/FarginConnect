import { Component, Inject } from '@angular/core';
import { FarginServiceService } from '../../service/fargin-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-kyc-info',
  templateUrl: './kyc-info.component.html',
  styleUrl: './kyc-info.component.css',
})
export class KycInfoComponent {
  details: any;
  detaislone: any;
  approval1: any;
  bankdetails: any;
  KYCDetails: any;
  businessCategoryId: any;
  ResponseId: any;
  bankverifyres: any;
  Docname: any;
  message: any;
  showData!: boolean;
  kycres: any;
  jsonResponse: any;
  fullName: any;
  category: any;
  panNumber: any;
  referenceId: any;
  status: any;
  responseTime: any;
  Response: any;
  gender: any;
  state: any;
  age: any;
  last: any;
  remarks: any;
  mobile: any;
  temporary: any;
  initial: any;
  permanent: any;
  father: any;
  image: any;
  responseidentity: any;
  responseaddress: any;
  ola: any;
  permanentpin: any;
  citizenship: any;
  temporarypin: any;
  olaname: any;
  transportdoi: any;
  dob: any;
  transportdoe: any;
  bloodgroup: any;
  currentstatus: any;
  doe: any;
  doi: any;
  responsesign: any;
  file: any;
  verification: any;
  application: any;
  date: any;
  dobverified: any;
  dobcheck: any;
  inputdob: any;
  address: any;
  zip: any;
  line: any;
  country: any;
  city: any;
  street: any;
  full: any;
  maskedaadhaar: any;
  aadhaarlinked: any;
  phonenumber: any;
  categorys: any;
  email: any;
  statepan: any;
  inputvoterid: any;
  stcode: any;
  assemblyconstituencynumber: any;
  rlnnamev2: any;
  rlnnamev1: any;
  relationtype: any;
  rlnnamev3: any;
  namev1: any;
  clientid: any;
  epicno: any;
  namev2: any;
  namev3: any;
  pslatlong: any;
  lastupdate: any;
  id: any;
  assemblyconstituency: any;
  area: any;
  parliamentaryname: any;
  multiple: any;
  parliamentaryconstituency: any;
  parliamentarynumber: any;
  district: any;
  houseno: any;
  partnumber: any;
  pollingstation: any;
  sectionno: any;
  slnoinpart: any;
  relationname: any;
  agevoter: any;
  partname: any;
  constructor(
    private service: FarginServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  ngOnInit(): void {
    this.Response = this.data.value;
    this.ResponseId = this.data.value;
    this.responseidentity = this.data.value1;
    this.responseaddress = this.data.value1;
    this.responsesign = this.data.value1;

    console.log(this.responseidentity);

    this.service.facheckgetbyId(this.ResponseId).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.kycres = res.response.response;
        this.jsonResponse = JSON.parse(this.kycres);
        this.fullName = this.jsonResponse.validated_data.full_name ||
          this.jsonResponse.validated_data.name;
        this.gender = this.jsonResponse.validated_data.gender;
        this.age = this.jsonResponse.validated_data.age_range;
        this.state = this.jsonResponse.validated_data.state;
        this.last = this.jsonResponse.validated_data.last_digits;
        this.remarks = this.jsonResponse.validated_data.remarks;
        this.mobile = this.jsonResponse.validated_data.is_mobile;
        this.temporary = this.jsonResponse.validated_data.temporary_address;
        this.initial = this.jsonResponse.validated_data.initial_doi;
        this.permanent = this.jsonResponse.validated_data.permanent_address;
        this.father = this.jsonResponse.validated_data.father_or_husband_name;
        this.ola = this.jsonResponse.validated_data.ola_code;
        this.permanentpin = this.jsonResponse.validated_data.permanent_zip;
        this.citizenship = this.jsonResponse.validated_data.citizenship;
        this.temporarypin = this.jsonResponse.validated_data.temporary_zip;
        this.olaname = this.jsonResponse.validated_data.ola_name;
        this.transportdoi = this.jsonResponse.validated_data.transport_doi;
        this.transportdoe = this.jsonResponse.validated_data.transport_doe;
        this.dob = this.jsonResponse.validated_data.dob;
        this.bloodgroup = this.jsonResponse.validated_data.blood_group;
        this.currentstatus = this.jsonResponse.validated_data.current_status;
        this.doe = this.jsonResponse.validated_data.doe;
        this.doi = this.jsonResponse.validated_data.doi;
        this.file = this.jsonResponse.validated_data.file_number;
        this.verification =
          this.jsonResponse.validated_data.verification_message;
        this.application = this.jsonResponse.validated_data.application_type;
        this.date = this.jsonResponse.validated_data.date_of_application;
        this.dobverified = this.jsonResponse.validated_data.dob_verified;
        this.dobcheck = this.jsonResponse.validated_data.dob_check;
        this.inputdob = this.jsonResponse.validated_data.input_dob;
        this.address = this.jsonResponse.validated_data.address?.line_1;
        this.zip = this.jsonResponse.validated_data.address?.zip;
        this.country = this.jsonResponse.validated_data.address?.country;
        this.line = this.jsonResponse.validated_data.address?.line_2;
        this.city = this.jsonResponse.validated_data.address?.city;
        this.statepan = this.jsonResponse.validated_data.address?.state;
        this.street = this.jsonResponse.validated_data.address?.street_name;
        this.full = this.jsonResponse.validated_data.address?.full;
        this.maskedaadhaar = this.jsonResponse.validated_data.masked_aadhaar;
        this.aadhaarlinked = this.jsonResponse.validated_data.aadhaar_linked;
        this.phonenumber = this.jsonResponse.validated_data.phone_number;
        this.categorys = this.jsonResponse.validated_data.category;
        this.email = this.jsonResponse.validated_data.email;
        this.image = this.jsonResponse.validated_data.has_image;
        this.inputvoterid = this.jsonResponse.validated_data.input_voter_id;
        this.stcode = this.jsonResponse.validated_data.st_code;
        this.assemblyconstituencynumber =
          this.jsonResponse.validated_data.assembly_constituency_number;
        this.rlnnamev2 = this.jsonResponse.validated_data.rln_name_v2;
        this.rlnnamev1 = this.jsonResponse.validated_data.rln_name_v1;
        this.rlnnamev3 = this.jsonResponse.validated_data.rln_name_v3;
        this.relationtype = this.jsonResponse.validated_data.relation_type;
        this.namev1 = this.jsonResponse.validated_data.name_v1;
        this.clientid = this.jsonResponse.validated_data.client_id;
        this.epicno = this.jsonResponse.validated_data.epic_no;
        this.namev2 = this.jsonResponse.validated_data.name_v2;
        this.namev3 = this.jsonResponse.validated_data.name_v3;
        this.pslatlong = this.jsonResponse.validated_data.ps_lat_long;
        this.lastupdate = this.jsonResponse.validated_data.last_update;
        this.id = this.jsonResponse.validated_data.id;
        this.assemblyconstituency =
          this.jsonResponse.validated_data.assembly_constituency;
        this.area = this.jsonResponse.validated_data.area;
        this.parliamentaryname =
          this.jsonResponse.validated_data.parliamentary_name;
        this.multiple = this.jsonResponse.validated_data.multiple;
        this.parliamentaryconstituency =
          this.jsonResponse.validated_data.parliamentary_constituency;
        this.parliamentarynumber =
          this.jsonResponse.validated_data.parliamentary_number;
        this.district = this.jsonResponse.validated_data.district;
        this.houseno = this.jsonResponse.validated_data.house_no;
        this.partnumber = this.jsonResponse.validated_data.part_number;
        this.pollingstation = this.jsonResponse.validated_data.polling_station;

        this.sectionno = this.jsonResponse.validated_data.section_no;
        this.slnoinpart = this.jsonResponse.validated_data.slno_inpart;
        this.relationname = this.jsonResponse.validated_data.relation_name;
        this.agevoter = this.jsonResponse.validated_data.age;
        this.partname = this.jsonResponse.validated_data.part_name;
        this.panNumber =
          this.jsonResponse.validated_data.pan_number ||
          this.jsonResponse.validated_data.aadhaar_number ||
          this.jsonResponse.validated_data.passport_number ||
          this.jsonResponse.validated_data.license_number ||
          this.jsonResponse.validated_data.epic_no;
        this.referenceId = this.jsonResponse.reference_id;
        this.status = this.jsonResponse.status;
        this.message = this.jsonResponse.messsage; // Note: "messsage" has a typo
        this.responseTime = this.jsonResponse.response_time;
      }
    });
  }
}
