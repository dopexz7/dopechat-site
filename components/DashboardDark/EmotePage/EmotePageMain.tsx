import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import Head from "next/head";
import { supabase } from "lib/supabaseClient";
import Link from "next/link";
import * as Md from "react-icons/md";
import EmoteComponent from "../Main/Emote/EmoteComponent";
import stringSimilarity from "string-similarity";
import Image from "next/image";
const EmotePageMain = () => {
    const router = useRouter();
    const { id } = router.query as any;
    const user = useUser();
    const [data, setData] = useState() as any;
    const [rec, setRec] = useState() as any;
    const similiarStrings = (firstStr:string, secStr:string) => {
        try { return stringSimilarity?.compareTwoStrings(firstStr, secStr); }
        catch { return 0; }
    }
    useEffect(()=>{
        const gettingEmote = async() => await supabase.from('allemotes').select("*");
        gettingEmote().then((res)=> setData(res.data?.filter((v)=>  v.code.toLowerCase()===id?.toLowerCase())[0]));
        gettingEmote().then((res)=> setRec((res.data?.filter((v)=>  (similiarStrings(v?.code?.slice((v?.code?.length/2) - 1, v?.code?.length).toLowerCase(), id?.slice((id?.length/2) - 1, id?.length).toLowerCase()) >= 0.5) && v.code.toLowerCase() !== id?.toLowerCase()))?.slice(0,24)));
    },[id]);
    const deleteFromDb: Function = async (v:any) => 
        await supabase.from("allemotes").delete().eq("src", v.src);
    return (
            <>
            <Head>
            <title>{data?.code ? data?.code : `Doesn't exist`}</title>
            <meta name="description" content="Facebook Gaming extension dopeChat" />
            </Head>
            <div className="relative h-full w-full flex flex-col justify-center items-center">
                {data ? 
                <>
                    <div className="overflow-hidden rounded-2xl">
                        <Image
                        height={120}
                        width={120}
                        src={data?.src}
                        alt={data?.code}
                        />
                    </div>
                    <div className="mt-3 flex flex-col text-xl  space-y-1 uppercase justify-center items-center">
                        <div><span className="text-ma-pink font-bold">code:</span> {data?.code}</div>
                        <div><span className="text-ma-pink font-bold">date:</span> {data?.date ? data?.date : 'not available'}</div>
                        <div><span className="text-ma-pink font-bold">uploaded by:</span> {data?.uploaded_by ? data?.uploaded_by : 'not available'}</div>
                        <div className="text-ma-pink font-bold"><Link href={data ? data.src : '#'}>direct link</Link></div>
                        {user?.user_metadata.name === 'dope_xz7' ? (
                            <div
                                onClick={() => deleteFromDb(data)}
                                className={`remove !mt-3 w-full flex items-center justify-center hover:scale-95 p-3 rounded-2xl text-center text-white text-xl cursor-pointer duration-300 h-full`}
                            >
                                <Md.MdRemoveCircleOutline />
                            </div>
                            ) : (
                            ""
                            )}
                    </div>
                </> : 
                `Emote doesn't exist.`
                }
                <div className="mt-20 p-6 h-1/2 flex flex-col w-full">
                    <h1 className="text-2xl font-bold text-ma-pink text-center uppercase">Similar emotes</h1>
                    <div className="mt-10 justify-center gap-3 flex flex-wrap w-full">
                        {rec && rec.sort((a:any, b:any) => similiarStrings(b?.code?.toLowerCase().slice((b?.code?.length/2) - 1, b?.code?.length), id?.toLowerCase().slice((id?.length/2) - 1, id?.length)) - similiarStrings(a?.code?.toLowerCase().slice((a?.code?.length/2) - 1, a?.code?.length), id?.toLowerCase().slice((id?.length/2) - 1, id?.length)))
                            .map((v:any, index:number) => (
                                <EmoteComponent
                                key={index}
                                data={v}
                                />
                            ))
                        }
                        {!rec  || !rec.length ? 'No similar emotes.' : ''}
                    </div>
                </div>
            </div>
            </>
    );
}
export default EmotePageMain;