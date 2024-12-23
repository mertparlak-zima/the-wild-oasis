import { useSettings } from "../../hooks/useSettings";
import { useUpdateSetting } from "../../hooks/useUpdateSetting";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";

function UpdateSettingsForm() {
  const {
    isPending,
    settings: {
      minBookingLength,
      maxGuestPerBooking,
      breakfastPrice,
      MaxBookingLength,
    } = {},
    error,
  } = useSettings();

  const { isUpdating, updateSetting } = useUpdateSetting();

  if (isPending) {
    return <Spinner />;
  }

  if (error) {
    console.error(error);
    return <div>{error.message}</div>;
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isUpdating}
          onBlur={(e) => updateSetting({ minBookingLength: e.target.value })}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={MaxBookingLength}
          disabled={isUpdating}
          onBlur={(e) => updateSetting({ MaxBookingLength: e.target.value })}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestPerBooking}
          disabled={isUpdating}
          onBlur={(e) => updateSetting({ maxGuestPerBooking: e.target.value })}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          onBlur={(e) => updateSetting({ breakfastPrice: e.target.value })}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
