import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { FacturacionService } from '../../services/facturacion.service';
import { ICliente } from '../../interfaces/ICliente';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrl: './crear-cliente.component.scss'
})
export class CrearClienteComponent implements OnInit {
  clienteForm!: FormGroup;
  clienteIdUpdate!: number;
  isUpdate: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private facturacionService: FacturacionService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ){

  }


  ngOnInit(): void {
    this.clienteForm = this.formBuilder.group({
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      creationDate: [new Date(), Validators.required],
    });

    this.clienteIdUpdate = +this.route.snapshot.paramMap.get('id')!;
    if(this.clienteIdUpdate){
      //EL id del cliente es un numero
      //Ejecutar un metodo para obtener el dato y afirmarle al componente que sera para actualizar
      this.cargarCliente(this.clienteIdUpdate);
    }

  }

  onSubmit(): void{
    if(this.clienteForm.valid){
      //Los datos del usuario son validos
      const nuevoCliente: ICliente = this.clienteForm.value;
      if(this.isUpdate){
        //actualizar
        nuevoCliente.id = this.clienteIdUpdate;
        this.facturacionService.createCliente(nuevoCliente).subscribe(
          (response: any) => {
            console.log('Se actualizo el cliente');
            this.router.navigate(['home','lista-clientes']);
            this.toastr.success('Exito', 'Se actualizo correctamente');
          },
          (error: any) => {
            //console.error('Ocurrió un error al actualizar el cliente', error);
        
            // Mostrar mensaje de error en caso de fallo
            this.toastr.error('Error', 'Error al actualizar el usuario', {
              timeOut: 5000, // Duración de 5 segundos
            });
          }
        )
      } else {
        //guardar
        this.facturacionService.createCliente(nuevoCliente).subscribe(
          (response: any) => {
            console.log('Se guardo un nuevo cliente');
            this.router.navigate(['home','lista-clientes']);
            this.toastr.success('Exito', 'Se guardo correctamente');
          }
        )
      }
    } else {
      this.toastr.error('Error', 'Los datos no estan en el formato correcto', {
        timeOut: 5000, // Duración de 5 segundos
      });
    }
  }

  cargarCliente(id: number){
    this.facturacionService.getClienteById(id).subscribe(
    (cliente: ICliente) => {
      this.clienteForm.patchValue(cliente);
      this.isUpdate = true;
    }
    )
  }



}
