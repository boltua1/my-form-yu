"use server";

import { sendMailForm } from "@/lib/mail";
import { sendTelegramForm } from "@/lib/telegram";
import { SendFormSchema } from "@/shemas";
import * as z from "zod";

export const SendForm = async (values: z.infer<typeof SendFormSchema>) => {
    const validatedFailds = SendFormSchema.safeParse(values);

    if(!validatedFailds.success){
        return { error: "Infalid fields!" };
    }

    const { email, name, description } = validatedFailds.data;

    const dataMail = await sendMailForm ( email, name, description)
        .then((dataMail) => {
            if(dataMail === "Error"){
                return "Error";
            }

            return "Good";
        })
        .catch((error) => {
            console.log("error mail", error);
            return "Error"
        });
    
    const dataTelegram = await sendTelegramForm(email, name, description)  
        .then((dataRez) => {
            if(dataRez === "Error"){
                return "Error";
            }

            return "Good"
        })
        .catch(() => {
            return "Error";
        })
    
    if(dataTelegram === "Error") {
        return { error: "Invalid send telegram!" };
    }   

    if(dataMail === "Error") {
        return { error: "Infalid send email!"};
    }  
    
    return { success: "сообщение отправлено"};
}