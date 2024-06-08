from specklepy.api.client import SpeckleClient
from specklepy.api.credentials import get_default_account
from specklepy.transports.server import ServerTransport
from specklepy.api import operations
from specklepy.objects.geometry import Mesh
from specklepy.objects.base import Base
import google.generativeai as genai


# Function to extract and print mesh information
def extract_mesh_info(obj):
    meshes = []
    stack = [obj]
    
    while stack:
        current_obj = stack.pop()
        
        if isinstance(current_obj, Base):
            # Check if the object is a Mesh
            if isinstance(current_obj, Mesh):
                meshes.append(current_obj)
            
            # Add dynamic members to the stack
            for member_name in current_obj.get_member_names():
                member_value = getattr(current_obj, member_name)
                if isinstance(member_value, (Base, list)):
                    stack.append(member_value)
        elif isinstance(current_obj, list):
            stack.extend(current_obj)
    
    return meshes


# Function to extract data of the structure
HOST= 'https://speckle.xyz/'
def get_data(data):
    client = SpeckleClient(host=HOST)
    account = get_default_account()
    #Get the specified commit data
    commit = client.commit.get(data["stream_id"], data["commit_id"])
    referenced_object_id = commit.referencedObject

    # Initialize ServerTransport
    transport = ServerTransport(client=client, stream_id=data["stream_id"])
    received_object = operations.receive(obj_id=referenced_object_id, remote_transport=transport)

    # Extract meshes from the received object
    meshes = extract_mesh_info(received_object)
    
    return meshes[0].volume


# Function to get aec plan for the structure
def gemini_api_response(req):
    GOOGLE_API_KEY="GOOGLE_API_KEY"
    genai.configure(api_key=GOOGLE_API_KEY)
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(f"Please create a configuration for an AEC project with the following parameters: Volume of structure: {req["volume"]}. Location of structure: {req["place"]} cubic metres. Please guide upon the architectural requirements and the materials that should be choosen for the same, along with cost estimates.")
    return response.text