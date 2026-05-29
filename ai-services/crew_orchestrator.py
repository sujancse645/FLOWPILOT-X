"""
FlowPilot X — CrewAI Multi-Agent Orchestrator
Deploy specialized agents that collaborate, delegate, and execute workflows.
"""
import os
from dotenv import load_dotenv

load_dotenv()

# Agent role definitions for CrewAI
AGENT_ROLES = {
    "support": {
        "role": "Customer Support Specialist",
        "goal": "Resolve customer issues efficiently with empathy and accuracy",
        "backstory": "Expert in customer service with deep product knowledge.",
    },
    "sales": {
        "role": "Sales Development Representative",
        "goal": "Qualify leads and drive revenue growth",
        "backstory": "Top-performing SDR with expertise in B2B sales.",
    },
    "analytics": {
        "role": "Data Analytics Expert",
        "goal": "Extract insights and generate actionable reports",
        "backstory": "Senior data analyst specializing in business intelligence.",
    },
    "workflow": {
        "role": "Workflow Orchestrator",
        "goal": "Coordinate multi-agent tasks and ensure workflow completion",
        "backstory": "Master coordinator who delegates tasks across AI agents.",
    },
}


def create_crew(task_description: str, agent_types: list[str] = None):
    """
    Create a CrewAI crew for multi-agent task execution.
    Requires OPENAI_API_KEY in environment.
    """
    agent_types = agent_types or ["support", "workflow"]

    try:
        from crewai import Agent, Task, Crew, Process

        agents = []
        for agent_type in agent_types:
            config = AGENT_ROLES.get(agent_type, AGENT_ROLES["support"])
            agents.append(
                Agent(
                    role=config["role"],
                    goal=config["goal"],
                    backstory=config["backstory"],
                    verbose=True,
                    allow_delegation=True,
                )
            )

        tasks = [
            Task(
                description=task_description,
                expected_output="Detailed analysis and recommended actions",
                agent=agents[0],
            )
        ]

        crew = Crew(
            agents=agents,
            tasks=tasks,
            process=Process.sequential,
            verbose=True,
        )
        return crew
    except ImportError:
        return None


def run_orchestration(task: str, agents: list[str] = None) -> dict:
    """Execute multi-agent orchestration."""
    crew = create_crew(task, agents)
    if crew is None:
        return {
            "status": "simulated",
            "result": f"[Demo] CrewAI would process: {task[:100]}...",
            "agents": agents or ["support", "workflow"],
        }
    try:
        result = crew.kickoff()
        return {"status": "completed", "result": str(result), "agents": agents}
    except Exception as e:
        return {"status": "error", "message": str(e)}


if __name__ == "__main__":
    result = run_orchestration(
        "Analyze customer feedback and create action plan for Q2 improvements",
        ["support", "analytics", "workflow"],
    )
    print(result)
