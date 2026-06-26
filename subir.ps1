
# Ruta del proyecto
$repoPath = "C:\Users\paga7\Downloads\0.practicas programas\datarepositorio"

# URL del repositorio remoto en GitHub
$remoteUrl = "https://github.com/pagaremoto/MiDataRepositorio.git"

# Mensaje de commit
$commitMessage = "Actualización automática desde PowerShell"

# Ir a la carpeta del repositorio
Set-Location $repoPath

# Inicializar repo si no existe
if (!(Test-Path "$repoPath\.git")) {
    git init
    git branch -M main
    git remote add origin $remoteUrl
}

# Añadir cambios
git add .

# Crear commit
git commit -m $commitMessage

# Subir a GitHub
git push -u origin main
