


export default function CommentBox({commit}:{commit:string}){
   return(
      // commit container:
      <div className="px-10 py-2 bg-emerald-200/40 dark:bg-emerald-800/30 rounded-full shadow-inner shadow-gray-300 dark:shadow-emerald-700/50 border-emerald-800 text-lg animate-popIn [animation-duration:2s]">
         {/* Commit: */}
         <span className="text-emerald-600 text-lg md:text-2xl">{commit}</span>
      </div>
   )
}