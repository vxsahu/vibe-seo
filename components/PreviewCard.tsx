import React from 'react';
import { Globe, Facebook, Twitter } from 'lucide-react';
import { SEOMetadata } from '../types';

interface PreviewCardProps {
  type: 'google' | 'facebook' | 'twitter';
  data: SEOMetadata;
}

export const PreviewCard: React.FC<PreviewCardProps> = ({ type, data }) => {
  if (type === 'google') {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 font-sans max-w-xl overflow-hidden">
        <div className="flex items-center gap-2 mb-1">
            <div className="bg-gray-100 p-1 rounded-full">
                <Globe className="w-4 h-4 text-gray-600" />
            </div>
            <div className="flex flex-col">
                <span className="text-xs text-gray-800 font-medium">example.com</span>
                <span className="text-[10px] text-gray-500 leading-none">https://example.com/post-url</span>
            </div>
        </div>
        <div className="text-[#1a0dab] text-xl hover:underline cursor-pointer font-medium truncate">
          {data.seo_title || 'Your SEO Title Goes Here'}
        </div>
        <div className="text-[#4d5156] text-sm mt-1 leading-snug line-clamp-2">
          {data.meta_description || 'Your meta description will appear here. It should be compelling and descriptive.'}
        </div>
      </div>
    );
  }

  if (type === 'facebook') {
    return (
      <div className="bg-white rounded-lg border border-gray-300 overflow-hidden max-w-md font-sans">
        <div className="h-48 bg-gray-200 w-full flex items-center justify-center relative overflow-hidden">
            {data.og_image && !data.og_image.includes('example.com') ? (
                 <img src={data.og_image} alt="OG" className="w-full h-full object-cover" />
            ) : (
                <div className="text-gray-400 flex flex-col items-center">
                    <Facebook className="w-10 h-10 mb-2 opacity-50" />
                    <span className="text-xs">OG Image Preview</span>
                </div>
            )}
        </div>
        <div className="bg-[#f0f2f5] p-3 border-t border-gray-200">
          <div className="text-[10px] uppercase text-gray-500 font-semibold mb-0.5">EXAMPLE.COM</div>
          <div className="text-gray-900 font-bold text-base leading-tight mb-1 truncate">
            {data.og_title || 'Open Graph Title'}
          </div>
          <div className="text-gray-600 text-sm line-clamp-1">
            {data.og_description || 'Description for social media...'}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'twitter') {
    return (
      <div className="bg-black rounded-xl border border-gray-800 overflow-hidden max-w-md font-sans text-white">
        <div className="h-48 bg-gray-900 w-full flex items-center justify-center relative overflow-hidden">
            {data.twitter_image && !data.twitter_image.includes('example.com') ? (
                 <img src={data.twitter_image} alt="Twitter" className="w-full h-full object-cover" />
            ) : (
                <div className="text-gray-600 flex flex-col items-center">
                    <Twitter className="w-10 h-10 mb-2 opacity-50" />
                    <span className="text-xs">Twitter Image Preview</span>
                </div>
            )}
        </div>
        <div className="p-3">
          <div className="text-white font-bold text-base mb-1 truncate">
            {data.twitter_title || 'Twitter Title'}
          </div>
          <div className="text-gray-500 text-sm line-clamp-2">
            {data.twitter_description || 'Twitter description goes here...'}
          </div>
          <div className="text-gray-500 text-xs mt-2 flex items-center gap-1">
              <Globe className="w-3 h-3" /> example.com
          </div>
        </div>
      </div>
    );
  }

  return null;
};