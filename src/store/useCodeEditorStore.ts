import { create } from "zustand";
import { CodeEditorState, DEFAULT_EDITOR_CONFIG } from "@/types";
import { LANGUAGE_CONFIG } from "@/app/(root)/_constant";


const getInitialState = ()=>{
    //if we are on the server return default values
    if(typeof window == 'undefined'){return {
            language: DEFAULT_EDITOR_CONFIG.language,
            fontSize: DEFAULT_EDITOR_CONFIG.fontSize ,
            theme: DEFAULT_EDITOR_CONFIG.theme,

        }

    }

    const savedLanguage = localStorage.getItem(DEFAULT_EDITOR_CONFIG.GET_EDITOR_LANGUAGE) || DEFAULT_EDITOR_CONFIG.language;
    const savedTheme = localStorage.getItem(DEFAULT_EDITOR_CONFIG.GET_EDITOR_THEME)||DEFAULT_EDITOR_CONFIG.theme;
    const savedFontSize = localStorage.getItem(DEFAULT_EDITOR_CONFIG.GET_EDITOR_FONT_SIZE)||DEFAULT_EDITOR_CONFIG.fontSize;
    
    // Ensure that both theme and fontSize have non-null/non-undefined defaults
    const themeValue = savedTheme || DEFAULT_EDITOR_CONFIG.theme;
    // Use the default if the parsed number is NaN (which happens if savedFontSize is null)
    const fontSizeValue = Number(savedFontSize) || DEFAULT_EDITOR_CONFIG.fontSize || 16;


    return {
        language: savedLanguage,
        theme: themeValue,
        fontSize: fontSizeValue
    }
}
export const useCodeEditorStore = create<CodeEditorState>((set, get)=>{
    const initialState = getInitialState();
    return {
        ...initialState,
        output: "",
        isRunning: false,
        editor: null,
        error: "",

    
        executionResult: null,
        getCode: ()=> get().editor?.getValue()|| "",
        setEditor: (editor:CodeEditorState["editor"])=>{
            const savedCode = localStorage.getItem(`editor-code-${get().language}`)
            if(savedCode) editor?.setValue(savedCode);

            set({editor})
        },
        setTheme: (theme:string)=>{
            localStorage.setItem(DEFAULT_EDITOR_CONFIG.GET_EDITOR_THEME, theme);
            set({theme})
        },

        setFontSize: (fontSize: number)=>{
            localStorage.setItem(DEFAULT_EDITOR_CONFIG.GET_EDITOR_FONT_SIZE, fontSize.toString());
            set({fontSize})
        },

        setLanguage: (language:string)=>{
            const currentCode = get().editor?.getValue();
            if(currentCode){
                localStorage.setItem(`editor-code-${get().language}`, currentCode);

            }
            localStorage.setItem(DEFAULT_EDITOR_CONFIG.GET_EDITOR_LANGUAGE, language);
            set({
                language,
                output:"",
                error: null
            })
        },
        runCode: async()=>{
            const {language, getCode} = get();
            const code = getCode();
            if(!code){
                set({error: "Please enter some code to run"});
                return;
            }
            set({isRunning: true, error: null , output: ""});
            try{

                const startTime = Date.now();
                const runtime = LANGUAGE_CONFIG[language].pistonRuntime;
                const response = await fetch("https://emkc.org/api/v2/piston/execute",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",

                    },
                    body: JSON.stringify({
                        language: runtime.language,
                        version: runtime.version,
                        files: [{content: code}],
                        run_timeout: 5000,
                        compile_timeout:10000,
                        run_memory_limit: 500 * 1024 * 1024,  // 100mb
                        compile_memory_limit: 200 * 1024 * 1024     // 50 MB

                    })
                })

                
                const data = await response.json();
                const endTime= Date.now();
                const executionTimeMs = endTime - startTime;
                console.log("Execution Data: ", data);
                console.log(`with execution time ${executionTimeMs} ms`);
                if(data.message){
                    set({error: data.message, executionResult: {code, output:"", error: data.message}})
                    return;
                }

                if(data.run && data.run.signal==="SIGKILL"){
                    set({error: "⚠️ Program was killed (SIGKILL). Likely exceeded memory or runtime limit.", executionResult: {code, output:"", error: "⚠️ Program was killed (SIGKILL). Likely exceeded memory or runtime limit."}})
                    return;
                }
                if(data.compile && data.compile.code !==0){
                    const error = data.compile.stderr || data.compile.output;
                    set({
                        error,
                        executionResult:{
                            code,
                            output:"",
                            error
                        }
                    })

                    return;
                }

                if(data.run && data.run.code!=0){
                    const error = data.run.stderr || data.run.output;
                    set({
                        error,
                        executionResult:{
                            code,
                            output: "",
                            error
                        }
                    })

                    return;
                }

                //no error, execution was successfull
                const output = data.run.output;
                set({
                    output: output.trim(),
                    error: null,
                    executionResult:{
                        code,
                        output: output.trim(),
                        error : null
                    }
                }) 

            }catch(error){
                console.log("Error running code: ", error);
                set({
                    error: "Error running code",
                    executionResult:{
                        code,
                        output: "",
                        error: "Error running code"
                    }
                })
            }finally{
                set({isRunning: false})
            }

        },
    }
})

export const getExecutionResult = ()=>useCodeEditorStore.getState().executionResult;