import { FormInput } from "@/components/FormInput";
import { FormInputRadio } from "@/components/FormInputRadio";
import { schemaCheckoutForm, type typeCheckoutForm } from "@/schemas/checkout.schema";
import { defaultCheckoutForm } from "@/utils/default";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    formState: { errors }
  } = useForm<typeCheckoutForm>({
    resolver: zodResolver(schemaCheckoutForm),
    defaultValues: defaultCheckoutForm
  })

  const typeOfDeliveryValue = watch("typeOfDelivery");
  const typeOfPaymentValue = watch("typeOfPayment")

  const onSubmit = (data: typeCheckoutForm) => {
    if (data.typeOfDelivery === 'local') {
      delete data.guestUserAddress
    }
    console.log({
      ...data,
      ...(data.typeOfPayment === 'bank' && { imageVoucher: null })
    })
    // navigate('/voucher')
  }

  return (
    <section className="relative max-w-7xl mx-auto outline-1 bg-white text-gray-800 min-h-screen flex flex-col">
      {/* HEADER */}
      <div className='flex items-center justify-between p-4 shadow-sm'>
        <ArrowLeft onClick={() => navigate('/cart')} strokeWidth={3} className='cursor-pointer' />
        <h2 className="text-2xl text-center flex-1 font-semibold">Finalizar Compra</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="flex flex-col gap-3 px-3 pt-3">
          <FormInput
            id="guestUserName"
            label="Nombre"
            placeholder="Ingresa tu nombre"
            {...register("guestUserName")}
            error={errors.guestUserName?.message}
          />
          <FormInput
            id="guestUserPhone"
            label="Número de teléfono"
            placeholder="Ingresa tu número"
            {...register("guestUserPhone")}
            error={errors.guestUserPhone?.message}
          />
        </section>
        <section className="px-3">
          <h3 className="font-semibold my-4">Tipo de Entrega</h3>
          <div className="flex flex-col gap-4">
            <FormInputRadio
              {...register("typeOfDelivery")}
              value="local"
              label="Recogida local"
              checked={typeOfDeliveryValue === "local"}
              onChange={() => {
                setValue("typeOfDelivery", "local");
                setValue("guestUserAddress", "");
                clearErrors("typeOfDelivery");
              }}
            />
            <FormInputRadio
              {...register("typeOfDelivery")}
              value="delivery"
              label="A domicilio"
              checked={typeOfDeliveryValue === "delivery"}
              onChange={() => {
                setValue("typeOfDelivery", "delivery")
                clearErrors("typeOfDelivery");
              }}
            />
            {errors.typeOfDelivery && <p className="text-sm text-red-400">{errors.typeOfDelivery.message}</p>}
          </div>
        </section>
        {typeOfDeliveryValue === "delivery" && (
          <section className="flex flex-col gap-3 px-3 pt-3">
            <FormInput
              id="guestUserAddress"
              label="Direccion domiciliaria"
              placeholder="Ingresa tu direccion domiciliaria"
              {...register("guestUserAddress")}
              error={errors.guestUserAddress?.message}
            />
          </section>
        )}
        <section className="px-3">
          <h3 className="font-semibold my-4">Método de Pago</h3>
          <div className="flex flex-col gap-4">
            <FormInputRadio
              {...register("typeOfPayment")}
              value="cash"
              label="Efectivo"
              checked={typeOfPaymentValue === "cash"}
              onChange={() => {
                setValue("typeOfPayment", "cash");
                clearErrors("typeOfPayment");
              }}
            />
            <FormInputRadio
              {...register("typeOfPayment")}
              value="bank"
              label="Bancario"
              checked={typeOfPaymentValue === "bank"}
              onChange={() => {
                setValue("typeOfPayment", "bank");
                clearErrors("typeOfPayment");
              }}
            />
            {errors.typeOfPayment && <p className="text-sm text-red-400">{errors.typeOfPayment.message}</p>}
          </div>
        </section>
        {typeOfPaymentValue === "bank" && (
          <section className="flex flex-col gap-3 px-3 pt-3 text-gray-400">
            agregar voucher de pago como prueba
          </section>
        )}
        <section className="flex flex-col gap-3 px-3 pt-3">
          <FormInput
            id="notes"
            label="Notas para la tienda"
            placeholder="Ingesa datos extras como cantidad exacta con la que pagara, etc."
            {...register("notes")}
            error={errors.notes?.message}
          />
        </section>
        {/* RESUMEN */}
        <div className="outline-1 outline-gray-200 m-3 mt-10 rounded-lg">
          <h3 className="font-semibold p-3">Resumen</h3>
          <div className="flex justify-between border-t-2 border-t-[#F3F4F6] py-2 mx-3 text-sm">
            <p>Total productos</p>
            <p>s/ 15.00</p>
          </div>
          <div className="flex justify-between border-t-2 border-t-[#F3F4F6] py-2 mx-3 text-sm">
            <p>Delivery</p>
            <p>s/ 2.00</p>
          </div>
          <div className="flex justify-between border-t-2 border-t-[#F3F4F6] py-2 mx-3 text-sm font-semibold">
            <p className="">Total</p>
            <p className="text-orange-500">s/ 2.00</p>
          </div>
        </div>
        <div className="px-3">
          <button type="submit" className="cursor-pointer bg-[#EC6D13] text-white py-3 rounded-md text-sm w-full px-3 mb-6">
            Finalizar compra
          </button>
        </div>
      </form>
    </section>
  )
}

export default Checkout;