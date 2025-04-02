"use client"

import { useEffect, useRef, useState } from "react"
import * as maptilersdk from "@maptiler/sdk"
import "@maptiler/sdk/dist/maptiler-sdk.css"
import { Loader2 } from "lucide-react"
import './map.css';
const MAPTILER_KEY = 'zaTgxNWyl7AKhy1KzJDd'
const MAP_STYLE = `https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_KEY}`

interface MapMarker {
  id: string
  coordinates: [number, number]
  title: string
  description: string
}

interface MapComponentProps {
  center: [number, number]
  markers: MapMarker[]
  zoom?: number
}

export default function Map({ center, markers, zoom = 12 }: MapComponentProps) {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const tokyo = { lng: 139.753, lat: 35.6844 };
    zoom = 14;
    maptilersdk.config.apiKey = 'zaTgxNWyl7AKhy1KzJDd';
    console.log(markers)
    useEffect(() => {
        if (map.current) return; // stops map from intializing more than once

        map.current = new maptilersdk.Map({
            container: mapContainer.current,
            style: maptilersdk.MapStyle.STREETS,
            center: [center[0], center[1]],
            zoom: zoom
        });
        const filtermarkers = markers[0].coordinates;
        new maptilersdk.Marker({ color: "#FF0000" })
            .setLngLat([filtermarkers[0],filtermarkers[1]])
            .addTo(map.current);
    }, [center[0], center[1], zoom]);

    return (
        <div className="h-[500px] relative rounded-md">
            <div ref={mapContainer} className="map rounded-md" />
        </div>
    );
}

