"use client";

import React from "react";
import Image from "next/image";

import { Control } from "react-hook-form";
import { FormFieldType } from "./forms/PatientForm";

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({ field, props }: { field: any, props: CustomProps }) => {
  const { control, fieldType, name, label, placeholder, iconSrc, iconAlt } = props;

  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || 'icon'}
              height={24}
              width={24}
              className="ml-2"
            />
          )}

          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );

    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="IN"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as string | undefined}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      );

    default:
      break;
  }
}

export default function CustomFormField(props: CustomProps) {
  const { control, fieldType, name, label, placeholder, iconSrc, iconAlt } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>
              {label}
            </FormLabel>
          )}

          <RenderField field={field} props={props} />

          <FormMessage className="shad-error" />

        </FormItem>
      )}
    />
  );
}