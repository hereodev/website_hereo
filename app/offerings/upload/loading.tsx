

// export default function OfferingUploadLoading() {

//     return (
//         <div>
//             <h1>Upload Work</h1>    
//             <div className="w-full h-screen flex justify-center items-center">
//                 <span className="loading loading-ring loading-lg"></span>
//             </div>
//         </div>
//     )
// }


// loading.tsx

import React from 'react';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <h1>Upload Work</h1>
      <div className="form-control w-full">
        {/* Title */}
        <div className="label pb-1">
          <span className="label-text title-txt">Title</span>
        </div>
        <div className="skeleton h-12 w-full"></div>
      </div>

      <div className="form-control w-full">
        {/* Subtitle */}
        <div className="label pb-1">
          <span className="label-text title-txt">Subtitle</span>
        </div>
        <div className="skeleton h-12 w-full"></div>
      </div>

      <div className="form-control w-full">
        {/* Categories */}
        <div className="label pb-1">
          <span className="label-text title-txt">Prompt(s)</span>
        </div>
        <div className="skeleton h-12 w-full"></div>
      </div>

      <div className="form-control w-full">
        {/* Authors */}
        <div className="label pb-1">
          <span className="label-text title-txt">Author(s)</span>
        </div>
        <div className="skeleton h-8 w-full"></div>
        <div className="skeleton h-8 w-full mt-2"></div>
      </div>

      <div className="form-control w-full">
        {/* Content (Tiptap) */}
        <div className="label pb-1">
          <span className="label-text title-txt">Content</span>
        </div>
        <div className="skeleton h-32 w-full"></div>
      </div>

      <div className="form-control w-full">
        {/* Media */}
        <div className="label pb-1">
          <span className="label-text title-txt">Media</span>
        </div>
        <div className="skeleton h-12 w-full"></div>
      </div>

      <div className="form-control w-full">
        {/* Link */}
        <div className="label pb-1">
          <span className="label-text title-txt">Link</span>
        </div>
        <div className="skeleton h-12 w-full"></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
