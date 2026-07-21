@echo off

:: Move to the project root using the built-in GM variable
cd /d "%YYprojectDir%"

echo [GameMaker_Typescript] Starting TypeScript compilation...

:: Prefer the project-local compiler so builds use the pinned version.
if exist "%YYprojectDir%\node_modules\.bin\gmts.cmd" (
    call "%YYprojectDir%\node_modules\.bin\gmts.cmd" compile
    if errorlevel 1 exit /b 1
    exit /b 0
)

:: Fall back to a global compiler.
where gmts >nul 2>nul
if errorlevel 1 (
    echo [ERROR] gmts CLI not found. Install @odemian/gamemaker-typescript locally or globally.
    exit /b 1
)

:: Run the compilation
call gmts compile

if errorlevel 1 (
    echo [GameMaker_Typescript] ERROR: TypeScript validation or compilation failed
    exit /b 1
)

echo [GameMaker_Typescript] Typescript project compiled complete.
exit /b 0
