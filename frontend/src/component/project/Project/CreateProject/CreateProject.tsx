import { Navigate, useNavigate } from 'react-router-dom';
import ProjectForm from '../ProjectForm/ProjectForm';
import useProjectForm, {
    DEFAULT_PROJECT_STICKINESS,
} from '../hooks/useProjectForm';
import { CreateButton } from 'component/common/CreateButton/CreateButton';
import FormTemplate from 'component/common/FormTemplate/FormTemplate';
import { CREATE_PROJECT } from 'component/providers/AccessProvider/permissions';
import useProjectApi from 'hooks/api/actions/useProjectApi/useProjectApi';
import { useAuthUser } from 'hooks/api/getters/useAuth/useAuthUser';
import useUiConfig from 'hooks/api/getters/useUiConfig/useUiConfig';
import useToast from 'hooks/useToast';
import { formatUnknownError } from 'utils/formatUnknownError';
import { GO_BACK } from 'constants/navigate';
import { usePlausibleTracker } from 'hooks/usePlausibleTracker';
import { Button, styled } from '@mui/material';
import { useUiFlag } from 'hooks/useUiFlag';
import { useState } from 'react';

const CREATE_PROJECT_BTN = 'CREATE_PROJECT_BTN';

const StyledButton = styled(Button)(({ theme }) => ({
    marginLeft: theme.spacing(3),
}));

const CreateProject = () => {
    const { setToastData, setToastApiError } = useToast();
    const { refetchUser } = useAuthUser();
    const { uiConfig } = useUiConfig();
    const useNewProjectForm = useUiFlag('newCreateProjectUI');
    const navigate = useNavigate();
    const { trackEvent } = usePlausibleTracker();
    const {
        projectId,
        projectName,
        projectDesc,
        projectMode,
        projectEnvironments,
        projectChangeRequestConfiguration,
        setProjectMode,
        setProjectId,
        setProjectName,
        setProjectDesc,
        setProjectEnvironments,
        updateProjectChangeRequestConfig,
        getCreateProjectPayload,
        clearErrors,
        validateProjectId,
        validateName,
        setProjectStickiness,
        projectStickiness,
        errors,
    } = useProjectForm();

    if (useNewProjectForm) {
        return <Navigate to={`/projects?create=true`} replace />;
    }

    const generalDocumentation =
        'Projects allows you to group feature flags together in the management UI.';

    const [documentation, setDocumentation] = useState(generalDocumentation);

    const clearDocumentationOverride = () =>
        setDocumentation(generalDocumentation);

    const { createProject, loading } = useProjectApi();

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        clearErrors();
        const validName = validateName();
        const validId = useNewProjectForm || (await validateProjectId());

        if (validName && validId) {
            const payload = getCreateProjectPayload({
                omitId: useNewProjectForm,
            });
            try {
                const createdProject = await createProject(payload);
                refetchUser();
                navigate(`/projects/${createdProject.id}`, { replace: true });
                setToastData({
                    title: 'Project created',
                    text: 'Now you can add flags to this project',
                    confetti: true,
                    type: 'success',
                });

                if (projectStickiness !== DEFAULT_PROJECT_STICKINESS) {
                    trackEvent('project_stickiness_set');
                }
                trackEvent('project-mode', {
                    props: { mode: projectMode, action: 'added' },
                });
            } catch (error: unknown) {
                setToastApiError(formatUnknownError(error));
            }
        }
    };

    const formatApiCode = () => {
        return `curl --location --request POST '${uiConfig.unleashUrl}/api/admin/projects' \\
--header 'Authorization: INSERT_API_KEY' \\
--header 'Content-Type: application/json' \\
--data-raw '${JSON.stringify(
            getCreateProjectPayload({ omitId: useNewProjectForm }),
            undefined,
            2,
        )}'`;
    };

    const handleCancel = () => {
        navigate(GO_BACK);
    };

    return (
        <FormTemplate
            loading={loading}
            title='Create project'
            description='Projects allows you to group feature flags together in the management UI.'
            documentationLink='https://docs.getunleash.io/reference/projects'
            documentationLinkLabel='Projects documentation'
            formatApiCode={formatApiCode}
        >
            <ProjectForm
                errors={errors}
                handleSubmit={handleSubmit}
                projectId={projectId}
                setProjectId={setProjectId}
                projectName={projectName}
                projectStickiness={projectStickiness}
                projectMode={projectMode}
                setProjectMode={setProjectMode}
                setProjectStickiness={setProjectStickiness}
                setProjectName={setProjectName}
                projectDesc={projectDesc}
                setProjectDesc={setProjectDesc}
                mode='Create'
                clearErrors={clearErrors}
                validateProjectId={validateProjectId}
            >
                <CreateButton
                    name='project'
                    permission={CREATE_PROJECT}
                    data-testid={CREATE_PROJECT_BTN}
                />
                <StyledButton onClick={handleCancel}>Cancel</StyledButton>
            </ProjectForm>
        </FormTemplate>
    );
};

export default CreateProject;
