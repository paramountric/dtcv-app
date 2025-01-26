from fastapi import APIRouter, HTTPException
import os
import subprocess
from pathlib import Path
from app.config.settings import DATA_DIR

router = APIRouter(tags=["download"])

@router.post("/demo")
async def download_demo_data():
    """
    Download DTCC demo data to the data volume mounted in the container.
    
    Returns:
        Dict containing download status and output directory
    """
    try:
        print("Downloading DTCC demo data...")
        
        # Create data directory if it doesn't exist
        DATA_DIR.mkdir(parents=True, exist_ok=True)
        
        # Store current directory
        original_dir = os.getcwd()
        
        try:
            # Change to the data directory before running the command
            os.chdir(str(DATA_DIR))
            
            # Run the dtcc-download-demo-data command
            result = subprocess.run(
                ["dtcc-download-demo-data"],
                capture_output=True,
                text=True,
                check=True
            )
            
            return {
                "status": "success",
                "message": "Demo data downloaded successfully",
                "output_directory": str(DATA_DIR),
                "command_output": result.stdout
            }
            
        finally:
            # Ensure we change back to original directory
            os.chdir(original_dir)
            
    except subprocess.CalledProcessError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to download demo data: {e.stderr}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error during download: {str(e)}"
        ) 