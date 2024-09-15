import '../sass/mobile/generator.sass';
import { useForm } from 'react-hook-form';
import { Context } from '../generator';
import React, { useContext, useEffect } from'react';


export const Importer = () => {
    const { register, handleSubmit } = useForm();
    const context = useContext(Context);


    const onSubmit = (data: any) => {
        console.log('test')
        context.setImages([...context.images,...data.images]);
    }

    return (
        <form id="importer" onSubmit={handleSubmit(onSubmit)}>
            <input {...register("images", {required: "Required"})} type="file" name="images" multiple/>
            <button type="submit">upload</button>
        </form>
    );
}