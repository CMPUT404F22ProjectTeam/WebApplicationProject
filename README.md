# WebApplicationProject
A Web Application Project :)

## How to Install and Run the Project
### Backend
#### Set up PostgreSQL database
install postgresql v15.0
create the `localhost` server based on instruction
make sure to have database user account with the below credential:\
`username: postgres`\
`password: mysite`

#### Setup Virtual Environment

Unix or MacOS (bash)
```
python3.10 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Windows (powershell)
```
python -3.10 -m venv .\venv
.\venv\Scripts/Activate.ps1
pip install -r requirements.txt
```
(if powershell throws an error saying the script is not digitally signed) 
```
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```


!! Make sure you work in venv !!
  - On Unix or MacOS, using the bash shell: `source /path/to/venv/bin/activate`
  - On Unix or MacOS, using the csh shell: `source /path/to/venv/bin/activate.csh`
  - On Unix or MacOS, using the fish shell: `source /path/to/venv/bin/activate.fish`
  - On Windows using the Command Prompt: `path\to\venv\Scripts\activate.bat`
  - On Windows using PowerShell: `path\to\venv\Scripts\Activate.ps1`

#### To run the live server:

`python manage.py runserver`
to view api documentations after building, go to `http://127.0.0.1:8000/admin` if working on local host

#### When working:

- If adding new dependency always add to requirements.txt file
  - `pip freeze > requirements.txt`
- To update your installation after a pull, simply run pip install again
  - `pip install -r requirements.txt`
  
### Frontend
```
npm install
npm start
```

#### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
The page will reload when you make changes.

#### `npm run build`

Builds the app for production to the `build` folder.

## Members
|  Member Name  | CCID |
| ------------- | ------------- |
| Ke Li  | kli1  |
| Yanzhi Huang | yanzhi |
| Yuting He | yhe7 |
| Simiao Zheng | simiao4 |

## LICENSE
LICENSE'D under the Apache 2 license


Contributors:

    Ke Li
    Yanzhi Huang
    Yuting He
    Simiao Zheng

