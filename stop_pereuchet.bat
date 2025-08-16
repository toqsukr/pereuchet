@echo off
:: Проверяем, запущен ли скрипт от администратора
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo You must be admin...
    :: Перезапускаем скрипт с правами админа
    powershell -Command "Start-Process cmd -ArgumentList '/c %~dpnx0' -Verb RunAs"
    exit /b
)

echo Stopping WSL...
start wsl -d Ubuntu -e bash -c "cd ~/pereuchet && sudo docker compose stop && exit"
pause
wsl --terminate Ubuntu