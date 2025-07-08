@echo off
start wsl -d Ubuntu -- bash -c "sudo service docker start && cd ~/pereuchet && sudo docker compose up -d; exec bash"