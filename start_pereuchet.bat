@echo off
:: Проверяем, запущен ли скрипт от администратора
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo You must be admin...
    :: Перезапускаем скрипт с правами админа
    powershell -Command "Start-Process cmd -ArgumentList '/c %~dpnx0' -Verb RunAs"
    exit /b
)

:: Если уже админ — выполняем команды
start wsl -d Ubuntu -- bash -c "sudo service docker start && cd ~/pereuchet && sudo docker compose up -d; exec bash && exit"