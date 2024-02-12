"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export const DataEventAdmin = ({ dataEvents }) => {

    const router = useRouter();

    const dataEventsFilter = dataEvents.filter(function (itemFilter) {
        return itemFilter.events.author == "ds_v3jTVjbKWukzTUd" || itemFilter.events.author == "ds_MqBbtrypLFQ6X3P" || itemFilter.events.author == "ds_FPFzoy8P0wqCDBl"
    })


    const shortenTitle = (title, maxLength) => {
        if (title.length <= maxLength) return title;
        const lastSpaceIndex = title.lastIndexOf(' ', maxLength);
        return title.slice(0, lastSpaceIndex > 0 ? lastSpaceIndex : maxLength) + '...';
    };


    const handleDelete = async (id) => {
        try {
            const resEventsMaker = await fetch(`https://eventmakers-api.fly.dev/events/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRzX01xQmJ0cnlwTEZRNlgzUCIsIm5hbWUiOiJyb25hbCB5dWx5YW50byIsImVtYWlsIjoic3VyZWwucm9uYWxAZ21haWwuY29tIiwiYXZhdGFyIjpudWxsLCJpYXQiOjE3MDc2NDAzNjAsImV4cCI6MTcxODAwODM2MH0.eEyXTA8CFQK1durOGksUsGxeuxaay0tTqvqyA3yP8IY"
                },
            });

            
                 await resEventsMaker.json();
                console.log("Event deleted successfully:", dataEventAdd);
                router.push('/');
           
        } catch (error) {
            console.error(error);
       
        }
    }

    return (
        <>
            <main className="card lg:grid lg:grid-cols-4 gap-6 p-5">
                {dataEventsFilter.map((item) => {
                    return (

                        <div className="card  bg-slate-800 shadow border border-slate-900 hover:scale-105 transition duration-500 overflow-hidden " key={item.events.id}>
                            <div className='w-full h-40 overflow-hidden '>
                                <img
                                    src={item.events.image}
                                    className='w-auto h-full  object-cover'
                                />
                            </div>
                            <div className="space-y-2 p-3">
                                <h2 className="card-title text-amber-400">{shortenTitle(item.events.title, 20)}</h2>
                                <p> {item.events.dateTime} {item.events.id}</p>
                                <div className="card-actions justify-end">
                                    <Link className="btn-primary btn btn-sm " href={''}>Edit</Link>
                                    <button className="btn btn-sm btn-accent " onClick={() => { handleDelete(item.events.id) }}>Hapus</button>
                                </div>

                            </div>
                        </div>
                    )
                })}
            </main>
        </>
    )
}