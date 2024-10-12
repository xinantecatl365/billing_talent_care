import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBill } from '../../../interfaces/IBill';
import { FacturacionService } from '../../../services/facturacion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-bill',
  templateUrl: './create-bill.component.html',
  styleUrl: './create-bill.component.scss'
})
export class CreateBillComponent {
  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private facturacionService: FacturacionService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    
    this.myForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(0)]],
      date: [null, Validators.required],
      details: ['', Validators.required],
      clientId: [null, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
      if (this.myForm.valid) {
        const newBill:IBill = this.myForm.value;
        this.facturacionService.createBill(newBill).subscribe(
          (response:any)=>{
            console.log('New bill saved');
            this.router.navigate(['home','billing/list']);
            this.toastr.success('Info', 'Saved successfully');
          }
        );
        
      }
    }
  }
}
